import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./callers";

export const userKey = {
  users: "users",
};

export const useGetUsers = (userQuery: TUserQuery) => {
  return useQuery({
    queryKey: [userKey.users, userQuery.field, userQuery.isAsc, userQuery.pagination.page, userQuery.pagination.limit],
    queryFn: () => getUsers(userQuery),
  });
};
