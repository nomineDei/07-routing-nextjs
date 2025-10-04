import type { Note } from "../types/note";
import axios from "axios";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${myKey}`,
    "Content-Type": "application/json",
  },
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<NotesResponse> {
  const res = await api.get<NotesResponse>("/notes", { params });
  console.log(res.data);

  return res.data;
}

export async function createNote(noteData: CreateNoteParams): Promise<Note> {
  const res = await api.post<Note>("/notes", noteData);

  return res.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);

  return res.data;
};
