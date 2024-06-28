import { supabase } from "@/supabase";
import { message } from "antd";

export const createMissionCategory = async (req: TMissionCategoryCreation) => {
  const { data, error } = await supabase.from("mission_category").insert(req).select<string, TMissionCategoryModel>();
  if (error !== null || data === undefined) {
    message.error("Error creating mission category");
    return undefined;
  }

  return data[0];
};

export const listMissionsCategories = async ({ pagination }: TMissionCategoryQuery) => {
  const start = pagination.page * pagination.limit;
  const { data, error } = await supabase
    .from("mission_category")
    .select<string, TMissionCategoryModel>()
    .is("deleted_at", null)
    .range(start, start + pagination.limit - 1)
    .order("id", { ascending: true });

  if (error !== null || data === null) {
    message.error("Error fetching mission categories");
    return [] as TMissionCategoryModel[];
  }

  return data;
};

export const countTotalMissionsCategories = async () => {
  const { data, error } = await supabase.from("mission_category").select("id", { count: "exact" }).is("deleted_at", null);

  if (error !== null || data === null) {
    message.error("Error fetching mission categories");
    return 0;
  }

  return data.length;
};

export const updateMissionCategory = async (id: number, req: TMissionCategoryUpdate) => {
  const { data, error } = await supabase.from("mission_category").update(req).eq("id", id).select<string, TMissionCategoryModel>();
  if (error !== null || data === undefined) {
    message.error("Error updating mission category");
    return undefined;
  }

  return data[0];
};
