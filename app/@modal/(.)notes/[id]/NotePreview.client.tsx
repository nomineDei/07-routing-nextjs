"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";

const NotePreviewClient = () => {
  const router = useRouter();
  const { id } = useParams();

  const noteId = id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isError || !data) return <p>Something went wrong.</p>;

  if (isLoading) return <p>Loading, please wait...</p>;

  const createdDate = new Date(data.createdAt).toLocaleString();

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
            <button className={css.closeBtn} onClick={handleClose}>
              ✕
            </button>
          </div>
          {data.tag && <p className={css.tag}>#{data.tag}</p>}
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{createdDate}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
