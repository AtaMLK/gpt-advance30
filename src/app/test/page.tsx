"use client";
import { useState } from "react";
import Button from "../component/ui/Button";
import Modal from "../component/ui/Modal";
import Drawer from "../component/ui/Drawer";
import { useToastStore } from "../lib/toastStore";
import ToastList from "../component/ui/ToastList";

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { showToast } = useToastStore();

  return (
    <div className="p-10 flex gap-10">
      <Button onclick={() => showToast("Added to your cart")}>
        <ToastList />
        Show Toast
      </Button>
      <Button onclick={() => setIsOpen(true)}>Opem Modal</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold">Modal Title</h2>
        <p>This is a custom modal.</p>
      </Modal>

      <Button onclick={() => setOpenDrawer(true)}>Opem Drawer</Button>

      <Drawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)}>
        <h2 className="text-xl font-bold">Drawer Content</h2>
        <p>This is a side drawer.</p>
        <p>This is a side drawer.</p>
        <p>This is a side drawer.</p>
        <p>This is a side drawer.</p>
        <p>This is a side drawer.</p>
      </Drawer>
    </div>
  );
}
