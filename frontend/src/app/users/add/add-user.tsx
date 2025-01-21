import React, { useRef } from "react";
import {
  Input,
  Button,
  Switch,
  Modal, ModalFooter, ModalHeader, ModalBody, ModalContent, Alert
} from "@heroui/react";
import { Form } from "@heroui/form";
import { useAddUser } from "@/hooks/users";
import { ICreateUser } from "@/types/users";

interface AddUserModalProps {
  onClose: (value: boolean) => void;
}


function AddUserModal({ onClose }: AddUserModalProps) {

const  nameRef = useRef<HTMLInputElement>(null)
  const { mutate: apiAddUser } = useAddUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      ...Object.fromEntries(formData),
      active: e.currentTarget.querySelector<HTMLInputElement>("input[name=active]")?.checked || false
    } as ICreateUser;
    apiAddUser(data, {
      onSuccess: () => {
        onClose(true)
      }
    });
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
            <ModalHeader>
              Add New User
            </ModalHeader>
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
                defaultSelected color="primary">
                Active
              </Switch>

            </ModalBody>
            <ModalFooter className="self-end">
              <Button color="primary" type="submit">
                Submit
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
};

export default AddUserModal;
