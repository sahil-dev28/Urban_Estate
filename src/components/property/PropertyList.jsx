import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProperties from "../../hooks/properties/useProperties";
import Filter from "../filter/Filter";
import PropertyCard from "./PropertyCard";
import { List, Map as MapIcon, SearchX } from "lucide-react";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";
import Map from "../map/Map";
import useGeocode from "../../hooks/useGeocode";
import Pagination from "../common/Pagination";

const PAGE_SIZE = 8;


export default function PropertyList() {
  const [searchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;

  const { property, totalPages, isLoading, isFetching, isError, error } =
    useProperties({ ...filters, pageNumber, pageSize: PAGE_SIZE });

  const [hoveredId, setHoveredId] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const { coords, pending } = useGeocode(property.map((p) => p.location));
  const markers = useMemo(
    () =>
      property
        .filter((p) => coords[p.location])
        .map((p) => ({ id: p._id, position: coords[p.location], property: p })),
    [property, coords],
  );

  if (isLoading) {
    return (
      <div>
        <Filter />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: PAGE_SIZE }, (_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  if (isError) {
    return <ErrorState message={error.message} />;
  }

  return (
    <div>
      <Filter />

      {property.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={SearchX}
            title="No properties found"
            message="Try a different city or widen your price range."
            actionLabel="Clear filters"
            actionTo="/property"
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,40%)]">
          <div className={showMap ? "hidden lg:block" : ""}>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-opacity ${
                isFetching ? "opacity-60" : "opacity-100"
              }`}
            >
              {property.map((property, index) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  index={index}
                  highlighted={property._id === hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>

            <Pagination totalPages={totalPages} />
          </div>

          <aside
            className={`${
              showMap ? "block" : "hidden"
            } relative h-[70vh] lg:sticky lg:top-4 lg:block lg:h-[calc(100vh-2rem)]`}
          >
            <Map
              markers={markers}
              highlightedId={hoveredId}
              onMarkerHover={setHoveredId}
            />
            {pending > 0 && (
              <div className="pointer-events-none absolute top-3 left-1/2 z-[400] -translate-x-1/2 rounded-full bg-card px-3 py-1 text-xs font-medium shadow-md">
                Locating {pending} {pending === 1 ? "property" : "properties"}…
              </div>
            )}
          </aside>

          <button
            type="button"
            onClick={() => setShowMap((current) => !current)}
            className="fixed bottom-6 left-1/2 z-[500] flex -translate-x-1/2 cursor-pointer items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-lg lg:hidden"
          >
            {showMap ? <List size={16} /> : <MapIcon size={16} />}
            {showMap ? "Show list" : "Show map"}
          </button>
        </div>
      )}
    </div>
  );
}
