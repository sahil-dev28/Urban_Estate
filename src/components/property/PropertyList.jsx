import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import useProperties from "../../hooks/properties/useProperties";
import Filter from "../filter/Filter";
import PropertyCard from "./PropertyCard";

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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Filter />

      {property.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No properties found.
        </p>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-3.5 transition-opacity ${
            isFetching ? "opacity-60" : "opacity-100"
          }`}
        >
          {property.map((property) => (
            <PropertyCard key={property.id} property={property} />
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
          activeLinkClassName="!border-blue-600 !bg-blue-600 !text-white hover:!bg-blue-600"
          disabledLinkClassName="opacity-40 pointer-events-none"
        />
      )}
    </div>
  );
}
