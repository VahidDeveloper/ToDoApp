"use client";
import { useEffect, useMemo, useState } from "react";

import { IUser } from "@/types/users";
import { useGetUsers } from "@/hooks/users";

const UserTable = () => {
  const { data, isError, isLoading } = useGetUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState<IUser[]>();

  useEffect(() => {
    if (data) setUserData(data.result)
  }, [data]);


  const filteredList = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return userData?.filter((user) =>
      user.username.toLowerCase().includes(searchLower));
  }, [userData, searchTerm]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
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
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4">
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
        </div>

        {filteredList?.map((user, index) => (
          <div
            className={`grid grid-cols-4 sm:grid-cols-4 ${index === filteredList?.length - 1
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
              <p className="font-medium text-dark dark:text-white">
                {user.active.toString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
