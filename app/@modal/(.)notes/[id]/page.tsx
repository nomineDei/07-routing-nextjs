import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetails from "@/app/notes/[id]/NoteDetails.client";
import NotePreviewClient from "./NotePreview.client";

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

const NotePreview = async ({ params }: NotePreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <NotePreviewClient>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetails />
      </HydrationBoundary>
    </NotePreviewClient>
  );
};

export default NotePreview;
