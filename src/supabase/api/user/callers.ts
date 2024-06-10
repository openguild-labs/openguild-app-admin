import { normalEmailRegex, studentEmailRegex } from "@/constants/regex";
import { supabase } from "../..";
import { message } from "antd";

export const getUsers = async ({ field, isAsc, pagination }: TUserFilter) => {
  const start = pagination.page * pagination.limit;
  const result: TUserListResponse = {
    list: [],
    total: 0,
  };
  const { data, error } = await supabase
    .from("user")
    .select<string, TUserModel>()
    .is("deleted_at", null)
    .order(field, { ascending: isAsc })
    .range(start, start + pagination.limit - 1);

  if (error !== null || data === null) {
    message.error("Error fetching users");
    return result;
  }

  const { data: totalData, error: totalError } = await supabase.from("user").select("id", { count: "exact" }).is("deleted_at", null);
  if (totalError !== null || totalData === null) {
    message.error("Error fetching total users");
    return result;
  }

  result.list = data;
  result.total = totalData.length;

  return result;
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
