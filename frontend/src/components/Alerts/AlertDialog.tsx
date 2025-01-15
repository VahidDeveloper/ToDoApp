"use client"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useEffect } from 'react'

interface AlertDialogProps {
  isVisible: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  confirmVariant?: 'danger' | 'primary'
}

export function AlertDialog({
  isVisible,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  confirmVariant = 'danger'
}: AlertDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, onCancel]);


  return (
    <Modal isOpen={isVisible} onOpenChange={(open) => !open && onCancel()}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>{description}</p>
            </ModalBody>
            <ModalFooter>
              <button
                className="hover:bg-blue-100 text-blue-500 font-semibold rounded-md py-2 px-3 mx-0.5 h-auto flex items-center space-x-2"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md py-2 px-3 h-auto flex items-center space-x-2"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}