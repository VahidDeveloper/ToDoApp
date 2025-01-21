"use client";
import React, { useEffect, useMemo, useState } from "react";

import { IUser } from "@/types/users";
import { useGetUsers } from "@/hooks/users";
import DeleteUser from "@/app/users/delete";
import { Alert, Button } from "@heroui/react";
import AddUserModal from "@/app/users/add/add-user";

const UserTable = () => {
  const { data, isError, isLoading, refetch } = useGetUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState<IUser>();
  const [userList, setUserList] = useState<IUser[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    if (data) setUserList(data.result);
  }, [data]);

  const openModal = () => setIsOpen(true);
  const closeModal = (value: boolean) => {
    setIsVisible(value);
    setUserData(undefined);
    setIsOpen(false);
    if (value) {
      refetch().then();
    }
  };

  const filteredList = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return userList?.filter((user) =>
      user.username.toLowerCase().includes(searchLower));
  }, [userList, searchTerm]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-col">
          <div className="mb-10 flex items-center space-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <Button onPress={openModal} color="primary" autoFocus>
              Add New User
            </Button>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-5">
            <div className="px-2 pb-3.5  text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                UserName
              </h5>
            </div>
            <div className="px-2 pb-3.5  text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="px-2 pb-3.5  text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Mobile
              </h5>
            </div>
            <div className="px-2 pb-3.5  text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                IsActive
              </h5>
            </div>
            <div className="px-2 pb-3.5 text-center">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
            </div>
          </div>

          {filteredList?.map((user, index) => (
            <div
              className={`grid grid-cols-5 sm:grid-cols-5 ${index === filteredList?.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
              }`}
              key={user.id}
            >
              <div className="px-2 py-4 flex items-center justify-center">
                <p className="font-medium text-dark dark:text-white">{user.username}</p>
              </div>
              <div className="px-2 py-4 flex items-center justify-center">
                <p className="font-medium text-dark dark:text-white">{user.email}</p>
              </div>
              <div className="px-2 py-4 flex items-center justify-center">
                <p className="font-medium text-dark dark:text-white">{user.mobile}</p>
              </div>
              <div className="px-2 py-4 flex items-center justify-center">
                <p className="relative z-10 flex h-9.5 w-full max-w-9.5 items-center justify-center">
                  <span className={`${user.active ? 'text-green' : 'text-danger'} material-symbols-outlined`}>{user.active ? "task_alt": "cancel"}</span>
                </p>
              </div>
              <div className="px-2 py-4 gap-1 flex items-center justify-center">
                <Button onPress={() => {
                  setUserData(user);
                  openModal();
                }} color="secondary" size="sm">
                  Edit
                </Button>
                <DeleteUser user={user} complete={refetch} />
              </div>
              {isOpen && <AddUserModal user={userData} onClose={closeModal} />}
            </div>

          ))}
        </div>
      </div>
      {isVisible && (
        <Alert
          color="success"
          title={"Success Notification"}
          description={`User ${userData ? `${userData.username} edited` : "added"} successfully`}
          isVisible={isVisible}
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
      )}
    </>
  );
};

export default UserTable;
