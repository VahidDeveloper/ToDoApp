import { useQuery } from "@tanstack/react-query";

import { IUser } from "@/types/users";
import { TableDataLayout } from "@/types/table";
import { getItems } from "@/http/generic-service";

const getUsers = async () => {
  const {data} = await getItems('users');
  return data as TableDataLayout<IUser>;
};


export const useGetUsers = () =>
  useQuery({ queryKey: ['getUsers'], queryFn: getUsers});



