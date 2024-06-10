import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, updateUser } from "./callers";

export const userKey = {
  users: "users",
};

export const useGetUsers = (userFilter: TUserFilter) => {
  return useQuery({
    queryKey: [userKey.users, userFilter.field, userFilter.isAsc, userFilter.pagination.page, userFilter.pagination.limit],
    queryFn: () => getUsers(userFilter),
  });
};

export const useUpdateUser = (walletAddress: string) => {
  return useMutation({
    mutationFn: (userUpdate: TUserUpdate) => updateUser(walletAddress, userUpdate),
    onSuccess: (resp) => {
      console.log(resp);
    },
  });
};
