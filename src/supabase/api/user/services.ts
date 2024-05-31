import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, updateUser } from "./callers";

export const userKey = {
  users: "users",
};

export const useGetUsers = (sortedField: TUserSortedField) => {
  return useQuery({
    queryKey: [userKey.users, sortedField.field, sortedField.isAsc],
    queryFn: () => getUsers(sortedField.field, sortedField.isAsc),
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
