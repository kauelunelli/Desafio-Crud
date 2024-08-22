import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  title,
  subtitle,
  onClose,
  children,
}: ModalProps) {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      tabIndex={-1}
      className={` fixed inset-0 bg-black/60 flex items-center justify-center z-50`}
    >
      <div className="bg-gray-900 max-w-xl rounded-xl py-5 px-6 ">
        <div className="space-y-3 w-full">
          <div className="flex items-center justify-between">
            <h3 className="font-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <X
              className="end-2.5 rounded-lg text-white hover:bg-gray-600 bg-transparent hover:text-zinc-400 transition-colors duration-300  cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <p className="text-sm text-gray-900 dark:text-white">{subtitle}</p>
          <div className="pt-4">
            <div className="space-y-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
