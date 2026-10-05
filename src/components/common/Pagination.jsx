import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

const linkClass =
  "flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent cursor-pointer";

// Page links driven by the `pageNumber` URL search param (1-based)
export default function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;

  if (totalPages <= 1) return null;

  const handlePageChange = ({ selected }) => {
    const next = new URLSearchParams(searchParams);
    next.set("pageNumber", String(selected + 1));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ReactPaginate
      breakLabel="…"
      previousLabel="‹ Prev"
      nextLabel="Next ›"
      onPageChange={handlePageChange}
      forcePage={Math.min(pageNumber, totalPages) - 1}
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
  );
}
