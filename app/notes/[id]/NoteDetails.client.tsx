"use client";

import { useParams } from "next/navigation";
import css from "./NodeDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

function NoteDetails() {
  const params = useParams();
  const id = params?.id;

  const noteId = id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false,
  });

  if (isError || !data) return <p>Something went wrong.</p>;

  if (isLoading) return <p>Loading, please wait...</p>;
  const createdDate = new Date(data.createdAt).toLocaleString();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{createdDate}</p>
      </div>
    </div>
  );
}

export default NoteDetails;
