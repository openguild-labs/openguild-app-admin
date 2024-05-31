import { normalEmailRegex, studentEmailRegex } from "@/constants/regex";
import { supabase } from "../..";

export const getUsers = async (field: keyof TUserModel, isAsc: boolean) => {
  const { data, error } = await supabase
    .from("user")
    .select<string, TUserModel>()
    .is("deleted_at", null)
    .order(field, { ascending: isAsc });

  if (error !== null || data === null) {
    console.error("Error fetching users", error);
    return [];
  }

  return data;
};

export const updateUser = async (walletAddress: string, userUpdate: TUserUpdate) => {
  if (Object.keys(userUpdate).length === 0) {
    return { message: "No data to update" } as TError;
  }

  if (userUpdate.email !== undefined && !normalEmailRegex.test(userUpdate.email)) {
    return { message: "Invalid email" } as TError;
  }

  let isStudent = false;
  if (userUpdate.email !== undefined && studentEmailRegex.test(userUpdate.email)) {
    isStudent = true;
  }

  const { data, error } = await supabase
    .from("user")
    .update({ ...userUpdate, is_student: isStudent })
    .eq("wallet_address", walletAddress)
    .select<string, TUserModel>();

  if (error !== null || data === null) {
    console.error("Error updating user", error);
    return undefined;
  }

  return data[0];
};
