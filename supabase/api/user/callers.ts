import { supabase } from "../..";
import { message } from "antd";

export const getUsers = async ({ field, isAsc, pagination }: TUserQuery) => {
  const start = pagination.page * pagination.limit;
  const result: TUserListResponse = {
    list: [],
    total: 0,
  };
  const getLisPromise = supabase
    .from("user")
    .select<string, TUserModel>()
    .is("deleted_at", null)
    .order(field, { ascending: isAsc })
    .range(start, start + pagination.limit - 1);

  const getTotalPromise = supabase.from("user").select("id", { count: "exact" }).is("deleted_at", null);

  const [{ data, error }, { data: totalData, error: totalError }] = await Promise.all([getLisPromise, getTotalPromise]);
  if (error !== null || totalError !== null) {
    message.error("Error fetching users");
    return result;
  }

  result.list = data;
  result.total = totalData.length;

  return result;
};
