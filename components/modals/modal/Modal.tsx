"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@components/ui/dialog";
import { useModalStore } from "@stores/modal";

const Modal = () => {
  const { isOpen, closeModal, config } = useModalStore();

  if (!isOpen || !config) return null;

  const { title, description, content } = config;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
