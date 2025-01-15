import { useQuery } from "@tanstack/react-query";

import { Task } from "@/types/users";
import { TableDataLayout } from "@/types/table";
import { getItems } from "@/http/generic-service";

const getTasks = async () => {
  const {data} = await getItems('tasks');
  return data as TableDataLayout<Task>;
};


export const useGetTasks = () =>
  useQuery({ queryKey: ['getTasks'], queryFn: getTasks});



