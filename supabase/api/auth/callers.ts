import { LOGIN_PATH } from "@/constants/links";
import { supabase } from "@/supabase";
import { message } from "antd";

export const signIn = async (req: TSignInRequest) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.email,
    password: req.password,
  });

  if (error !== null || data === null) {
    message.error("Error signing in: " + error?.message);
    return false;
  }

  return true;
};

export const getAuthUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error !== null || data === null) {
    window.location.href = LOGIN_PATH;
    return undefined;
  }

  return data.user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error !== null) {
    message.error("Error signing out: " + error?.message);
  }
  window.location.href = LOGIN_PATH;
};
