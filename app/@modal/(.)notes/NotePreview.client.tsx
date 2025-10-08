"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

interface NotePreviewClientProps {
  children: React.ReactNode;
}

const NotePreviewClient = ({ children }: NotePreviewClientProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <Modal onClose={handleClose}>{children}</Modal>;
};

export default NotePreviewClient;
