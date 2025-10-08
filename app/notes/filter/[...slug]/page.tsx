import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export const dynamic = "force-dynamic";

interface NotePageProps {
  params: Promise<{ slug?: string[] }>;
}

const allowedTags = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;
type AllowedTag = (typeof allowedTags)[number];

export default async function NotesPage({ params }: NotePageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const page = 1;
  const perPage = 12;
  const search = "";

  const rawTag = slug?.[0];
  const tag = allowedTags.includes(rawTag as AllowedTag)
    ? (rawTag as AllowedTag)
    : undefined;

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, perPage, search, tag],
    queryFn: () => fetchNotes({ page, perPage, search, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={page} perPage={perPage} tag={tag} />
    </HydrationBoundary>
  );
}
