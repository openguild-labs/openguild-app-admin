"use client";
import banner from "@/assets/images/discussion_forum.jpg";
import Image from "next/image";
import "../../styling/global.css";
import { Button, Input } from "antd";
import { useSignIn } from "@/supabase/api/auth/services";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MISSIONS_PATH } from "@/constants/links";

function Login() {
  const router = useRouter();
  const { mutate, isPending } = useSignIn();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSingIn = () => {
    mutate(credentials, {
      onSuccess: (resp) => {
        if (resp) {
          router.push(MISSIONS_PATH);
        }
      },
    });
  };

  return (
    <div className="w-screen h-screen flex items-center bg-white">
      <div className="lg:w-1/3 min-w-[420px] w-full px-4 flex-center">
        <div className="flex flex-col gap-y-2 w-3/4 max-w-[384px]">
          <h1 className="text-xl xl:text-2xl font-bold text-primary-color">Welcome back</h1>
          <p className="text-xs xl:text-sm mb-6">Sign in to your account</p>
          <Input
            placeholder="Enter your email"
            className="text-sm xl:text-base"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
          <Input.Password
            placeholder="Enter your password"
            className="text-sm xl:text-base"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSingIn();
              }
            }}
          />
          <Button type="primary" className="mt-4" onClick={handleSingIn} loading={isPending}>
            Sign In
          </Button>
        </div>
      </div>
      <div className="lg:block hidden w-2/3 h-full overflow-hidden border-l-2 border-primary-color/20 bg-primary-color/10">
        <Image className="w-full h-full object-cover" src={banner} alt="banner" />
      </div>
    </div>
  );
}

export default Login;
