import { useMutation, useQuery } from "@tanstack/react-query";

import { TableDataLayout } from "@/types/table";
import { ICreateUser, IUser } from "@/types/users";
import { deleteItem, getItems, patchItem, postItem, putItem } from "@/http/generic-service";

const getUsers = async () => {
  const { data } = await getItems("users");
  return data as TableDataLayout<IUser>;
};

const postUser = (data: ICreateUser) => postItem("users", data);

const putUser = (data: IUser) => putItem(`users/${data.id}`, data);

const deleteUser = (id: number) => deleteItem(`users/${id}`);

const userActivity = (id: number) => patchItem(`users/${id}/activity`);

export const useGetUsers = () =>
  useQuery({ queryKey: ["getUsers"], queryFn: getUsers });


export const useAddUser = () => useMutation({ mutationFn: postUser });

export const useUpdateUser = () => useMutation({ mutationFn: putUser });

export const useDeleteUser = () => useMutation({ mutationFn: deleteUser });

export const useToggleUserActivity  = () => useMutation({ mutationFn: userActivity });