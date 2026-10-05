import { useEffect, useState } from "react";

// Free-text locations are turned into coordinates with OpenStreetMap's Nominatim.
// Its usage policy allows ~1 request per second, so lookups go through a single
// queue and every answer (including misses) is cached in localStorage.

const CACHE_KEY = "geocode-cache-v1";
const REQUEST_GAP_MS = 1100;

const keyFor = (location) => location.trim().toLowerCase();

const readCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) ?? {};
  } catch {
    return {};
  }
};

const cache = readCache();
const inFlight = new Map();
let queue = Promise.resolve();

const saveCache = () => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Storage full or blocked: keep the in-memory cache only
  }
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchCoordinates(location) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.search = new URLSearchParams({
    q: location,
    format: "json",
    limit: "1",
    countrycodes: "in",
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Geocoding failed: ${response.status}`);
  const [match] = await response.json();
  return match ? [Number(match.lat), Number(match.lon)] : null;
}

function geocode(location) {
  const key = keyFor(location);
  if (key in cache) return Promise.resolve(cache[key]);
  if (inFlight.has(key)) return inFlight.get(key);

  const request = (queue = queue.then(async () => {
    try {
      const coords = await fetchCoordinates(location);
      cache[key] = coords;
      saveCache();
      return coords;
    } catch {
      // Network/rate-limit errors are not cached so they can be retried later
      return null;
    } finally {
      inFlight.delete(key);
      await wait(REQUEST_GAP_MS);
    }
  }));

  inFlight.set(key, request);
  return request;
}

/**
 * Resolves a list of location strings to coordinates.
 * Returns { coords: { [location]: [lat, lng] | null }, pending: number }.
 */
export default function useGeocode(locations) {
  const unique = [...new Set(locations.filter(Boolean))];
  const signature = unique.join("|");

  const [coords, setCoords] = useState({});

  useEffect(() => {
    let cancelled = false;
    const list = signature ? signature.split("|") : [];

    for (const location of list) {
      geocode(location).then((result) => {
        if (cancelled) return;
        setCoords((current) =>
          location in current ? current : { ...current, [location]: result },
        );
      });
    }

    return () => {
      cancelled = true;
    };
  }, [signature]);

  const resolved = {};
  let pending = 0;
  for (const location of unique) {
    const key = keyFor(location);
    if (location in coords) resolved[location] = coords[location];
    else if (key in cache) resolved[location] = cache[key];
    else pending += 1;
  }

  return { coords: resolved, pending };
}
