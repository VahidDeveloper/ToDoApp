import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@heroui/react";
import { useRef } from "react";

import { IUser } from "@/types/users";
import { useDeleteUser } from "@/hooks/users";

interface DeleteUserProps {
  user: IUser;
  complete: () => void;
}

export default function DeleteUser({ user, complete }: DeleteUserProps) {
  const { isOpen, onOpenChange } = useDisclosure();

  const targetRef = useRef(null);
  const { mutate: apiDeleteUser } = useDeleteUser();


  const handleDelete = () => {
    apiDeleteUser(user.id, {
      onSuccess: () => {
        complete();
      }, onError: (error) => {
        console.error("Failed to delete user:", error);
      }
    });
  };

  return (
    <>
      <Button
        onPress={onOpenChange}
        color="danger"
        size="sm"
      >
        Delete
      </Button>
      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete user
              </ModalHeader>
              <ModalBody>
                <p>
                  {`Are you sure you want to delete the user "${user.username}"? This action cannot be undone.`}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleDelete}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

