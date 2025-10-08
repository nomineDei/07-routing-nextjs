"use client";
import { useEffect, useState } from "react";
import css from "./page.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { Pagination } from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import { useDebounce } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, type NotesResponse } from "@/lib/api";

type NotesClientProps = {
  initialPage: number;
  perPage: number;
  tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

export default function NotesClient({
  initialPage,
  perPage,
  tag,
}: NotesClientProps) {
  const [page, setPage] = useState(initialPage);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isSuccess, isError, error, isLoading } =
    useQuery<NotesResponse>({
      queryKey: ["notes", page, perPage, debouncedSearch, tag],
      queryFn: () =>
        fetchNotes({ page, perPage, search: debouncedSearch, tag }),
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    setTotalPages(data?.totalPages ?? 0);
  }, [data?.totalPages]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  if (isError && error) {
    throw error;
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {totalPages > 1 && (data?.notes?.length ?? 0) > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading, please wait...</p>}
      {isSuccess && <NoteList notes={data?.notes || []} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
