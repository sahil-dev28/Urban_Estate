import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import useProperties from "../../hooks/properties/useProperties";
import Filter from "../filter/Filter";
import PropertyCard from "./PropertyCard";
import { SearchX } from "lucide-react";
import Loader from "../common/Loader";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

const PAGE_SIZE = 8;

const linkClass =
  "flex h-9 min-w-9 items-center justify-center rounded-md border border-gray-200 px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer";

export default function PropertyList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;

  const { property, totalPages, isLoading, isFetching, isError, error } =
    useProperties({ ...filters, pageNumber, pageSize: PAGE_SIZE });

  const handlePageChange = ({ selected }) => {
    const next = new URLSearchParams(searchParams);
    next.set("pageNumber", String(selected + 1));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <Loader />;
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
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 transition-opacity ${
            isFetching ? "opacity-60" : "opacity-100"
          }`}
        >
          {property.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <ReactPaginate
          breakLabel="…"
          previousLabel="‹ Prev"
          nextLabel="Next ›"
          onPageChange={handlePageChange}
          forcePage={pageNumber - 1}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          renderOnZeroPageCount={null}
          containerClassName="flex flex-wrap items-center justify-center gap-2 my-8 select-none"
          pageLinkClassName={linkClass}
          previousLinkClassName={linkClass}
          nextLinkClassName={linkClass}
          breakLinkClassName={linkClass}
          activeLinkClassName="!border-[var(--brand)] !bg-[var(--brand)] !text-black hover:!bg-[var(--brand-hover)]"
          disabledLinkClassName="opacity-40 pointer-events-none"
        />
      )}
    </div>
  );
}
