"use client";
import { useGetTasks } from "@/hooks/tasks";
import { Task } from "@/types/users";
import { useEffect, useMemo, useState } from "react";

const TaskTable = () => {
  const { data, isError, isLoading } = useGetTasks();
  const [searchTerm, setSearchTerm] = useState("");
  const [taskData, setTaskData] = useState<Task[]>();

  useEffect(() => {
    if (data) setTaskData(data.result)
  }, [data]);



  const filteredList = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return taskData?.filter((user) =>
      user.title.toLowerCase().includes(searchLower));
  }, [taskData, searchTerm]);

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

        <div className="grid grid-cols-3 sm:grid-cols-3">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Description
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Completed
            </h5>
          </div>
        </div>

        {filteredList?.map((task, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${index === filteredList?.length - 1
              ? ""
              : "border-b border-stroke dark:border-dark-3"
              }`}
            key={task.id}
          >
            <div className="px-2 py-4 flex items-center gap-0.5">
              <p className="font-medium text-dark dark:text-white">{task.title}</p>
            </div>
            <div className="px-2 py-4 flex items-center justify-center">
              <p className="font-medium text-dark dark:text-white">
                {task.description}
              </p>
            </div>
            <div className="px-2 py-4 flex items-center justify-center">
              <p className="font-medium text-dark dark:text-white">
                {task.completed.toString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTable;
