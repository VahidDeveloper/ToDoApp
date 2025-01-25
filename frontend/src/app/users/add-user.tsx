import React, { useRef, useEffect } from "react";
import {
  Input,
  Button,
  Switch,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalContent
} from "@heroui/react";
import { Form } from "@heroui/form";
import { useAddUser, useUpdateUser } from "@/hooks/users";
import { IUser } from "@/types/users";

interface AddUserModalProps {
  onClose: (value: boolean) => void;
  user?: IUser | null; // Optional user for edit mode
}

function AddUserModal({ onClose, user }: AddUserModalProps) {
  const nameRef = useRef<HTMLInputElement>(null);

  const { mutate: apiAddUser } = useAddUser();
  const { mutate: apiUpdateUser } = useUpdateUser(); // Hook for updating user

  useEffect(() => {
    // Prepopulate form fields in edit mode
    if (user) {
      const form = nameRef.current?.form;
      if (form) {
        form.username.value = user.username;
        form.email.value = user.email;
        form.mobile.value = user.mobile || "";
        form.active.checked = user.active;
      }
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      ...Object.fromEntries(formData),
      active:
        e.currentTarget.querySelector<HTMLInputElement>("input[name=active]")
          ?.checked || false
    } as IUser;
    if (user) {
      // Update user
      apiUpdateUser({ ...data, id: user.id }, {
        onSuccess: () => {
          onClose(true);
        }
      });
    } else {
      // Add new user
      apiAddUser(data, {
        onSuccess: () => {
          onClose(true);
        }
      });
    }
  };


  return (
    <>
      <Modal isOpen={true} onOpenChange={onClose}>
        <ModalContent>
          <Form
            className="w-full gap-4"
            validationBehavior="native"
            onReset={() => onClose(false)}
            onSubmit={handleSubmit}
          >
            <ModalHeader>{user ? "Edit User" : "Add New User"}</ModalHeader>
            <ModalBody>
              <Input
                ref={nameRef}
                isRequired
                errorMessage="Please enter a valid username"
                label="Username"
                labelPlacement="outside"
                name="username"
                type="text"
              />
              <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                type="email"
              />
              <Input
                errorMessage="Please enter a valid mobile number"
                label="Mobile"
                labelPlacement="outside"
                name="mobile"
                type="text"
              />
              <Input
                errorMessage="Please enter a valid password"
                label="Password"
                labelPlacement="outside"
                name="password"
                type="password"
              />
              <Switch
                name="active"
                defaultSelected={user?.active || false}
                color="primary"
              >
                Active
              </Switch>
            </ModalBody>
            <ModalFooter className="self-end">
              <Button color="primary" type="submit">
                {user ? "Update" : "Submit"}
              </Button>
              <Button type="reset" variant="flat" onPress={() => onClose(false)}>
                Close
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddUserModal;
