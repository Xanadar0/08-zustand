"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import fetchNoteId from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const noteId = +id;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteId(noteId),
    refetchOnMount: false,
  });

  function handleClose() {
    router.back();
  }

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading...</p>}

      {isError && (
        <div>
          <strong>Error:</strong> {(error as Error).message}
        </div>
      )}

      {data && <NotePreview note={data} />}
    </Modal>
  );
}