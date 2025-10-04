import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousLabel={"←"}
      nextLabel={"→"}
      disabledClassName={css.disabled}
    />
  );
}
