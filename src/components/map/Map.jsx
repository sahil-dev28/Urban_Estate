import "leaflet/dist/leaflet.css";
import "./Map.css";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";

const INDIA_CENTER = [22.5, 79];

const compactPrice = new Intl.NumberFormat("en-IN", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const priceIcon = (property, highlighted) =>
  L.divIcon({
    className: "",
    html: `<div class="price-marker${highlighted ? " is-active" : ""}">${
      property.price ? `₹${compactPrice.format(property.price)}` : "View"
    }</div>`,
    iconSize: [0, 0],
  });

// Zoom the map so every pin is visible whenever the set of pins changes.
// Also re-measures when the container is resized or revealed (e.g. the mobile
// map toggle), since Leaflet cannot size itself while hidden.
function FitToMarkers({ positions }) {
  const map = useMap();
  const signature = positions.map((p) => p.join(",")).join("|");

  useEffect(() => {
    const fit = (animate) => {
      if (!positions.length) return;
      if (positions.length === 1) {
        map.setView(positions[0], 12, { animate });
      } else {
        map.fitBounds(positions, { padding: [48, 48], maxZoom: 13, animate });
      }
    };

    fit(true);

    const observer = new ResizeObserver(() => {
      map.invalidateSize();
      fit(false);
    });
    observer.observe(map.getContainer());
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, signature]);

  return null;
}

export default function Map({ markers = [], highlightedId, onMarkerHover }) {
  const positions = useMemo(() => markers.map((m) => m.position), [markers]);

  return (
    <MapContainer
      center={INDIA_CENTER}
      zoom={4}
      scrollWheelZoom
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitToMarkers positions={positions} />
      {markers.map(({ id, position, property }) => (
        <Marker
          key={id}
          position={position}
          icon={priceIcon(property, id === highlightedId)}
          zIndexOffset={id === highlightedId ? 1000 : 0}
          eventHandlers={{
            mouseover: () => onMarkerHover?.(id),
            mouseout: () => onMarkerHover?.(null),
          }}
        >
          <Popup closeButton={false}>
            <Link to={`/property/${id}`} className="map-popup">
              <img src={property.propertyImage} alt={property.name} />
              <div>
                <p className="map-popup-title">{property.name}</p>
                <p className="map-popup-location">{property.location}</p>
                {property.price && (
                  <p className="map-popup-price">
                    ₹ {property.price.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
