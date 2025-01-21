import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
   Alert
} from "@heroui/react";
import { useDeleteUser } from "@/hooks/users";
import { IUser } from "@/types/users";

interface DeleteUserProps{
  user:IUser;
  complete: ()=> void
}

export default function DeleteUser({user, complete}:DeleteUserProps) {
  const {isOpen,  onOpenChange} = useDisclosure();
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);

  const targetRef = React.useRef(null);
  const { mutate: apiDeleteUser } = useDeleteUser();


  const handleDelete = () => {
    apiDeleteUser(user.id, {
      onSuccess: () => {
        setDeleteSuccess(true);
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
      {deleteSuccess && (
        <Alert
          color="danger"
          title={"Success Notification"}
          description={`User deleted successfully`}
          isVisible={deleteSuccess}
          variant="faded"
          onClose={() => setDeleteSuccess(false)}
        />
      )}
    </>
  );
}

