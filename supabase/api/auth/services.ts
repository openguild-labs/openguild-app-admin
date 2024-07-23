import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuthUser, signIn, signOut } from "./callers";

export const authKey = {
  user: "user",
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: (req: TSignInRequest) => signIn(req),
  });
};

export const useGetAuthUser = () => {
  return useQuery({
    queryKey: [authKey.user],
    queryFn: () => getAuthUser(),
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: () => signOut(),
  });
};
