import { useMutation, useQuery } from "@tanstack/react-query";

import { TableDataLayout } from "@/types/table";
import { ICreateUser, IUser } from "@/types/users";
import { getItems, postItem } from "@/http/generic-service";

const getUsers = async () => {
  const { data } = await getItems("users");
  return data as TableDataLayout<IUser>;
};

const postUser = (data: ICreateUser) => postItem("users", data);

export const useGetUsers = () =>
  useQuery({ queryKey: ["getUsers"], queryFn: getUsers });


export const useAddUser = () => useMutation({
  mutationFn: (newTodo: ICreateUser) => {
    return postUser(newTodo)
  },
});
