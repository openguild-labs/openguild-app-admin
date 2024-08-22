"use client";
import { ADD_MISSION_PATH, MISSIONS_PATH } from "@/constants/links";
import { Breadcrumbs, Typography } from "@mui/material";
import { GrFormAdd } from "react-icons/gr";
import { GoChevronRight } from "react-icons/go";
import { missionDetailsPathRegex } from "@/constants/regex";
import { Button, Form, message, Modal } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Footer from "./components/Footer";
import { FaDiscord } from "react-icons/fa";
import { useState } from "react";
import ChooseDiscordChannel from "./components/ChooseDiscordChannel";
import { useSendDiscordMessage } from "@/app/api/services";

interface IMissionsLayoutProps {
  children: React.ReactNode;
}

const getLastBreadcrumbLabel = (pathname: string) => {
  switch (true) {
    case missionDetailsPathRegex.test(pathname):
      return "details";
    case pathname === ADD_MISSION_PATH:
      return "add";
    default:
      return "list";
  }
};
const formFields = ["channel_id", "role_ids", "content"];

function MissionsLayout({ children }: IMissionsLayoutProps) {
  const pathname = usePathname();
  const isAddMission = pathname === ADD_MISSION_PATH;
  const isMissionDetails = missionDetailsPathRegex.test(pathname);
  const [open, isOpen] = useState(false);
  const [form] = Form.useForm();
  const { mutate: sendDiscordMessage } = useSendDiscordMessage();

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between h-10 mb-4">
        <div className="flex items-end">
          <h1 className="text-primary-color font-bold text-2xl xl:text-3xl pr-3 mr-3 border-r-2 border-primary-color">Mission</h1>
          <Breadcrumbs separator={<GoChevronRight />} aria-label="breadcrumb">
            {(isAddMission || isMissionDetails) && (
              <Link color="inherit" href={MISSIONS_PATH}>
                <span className="text-base xl:text-lg">list</span>
              </Link>
            )}
            <Typography color="text.primary">
              <span className="font-bold text-base xl:text-lg">{getLastBreadcrumbLabel(pathname)}</span>
            </Typography>
          </Breadcrumbs>
        </div>
        {pathname === MISSIONS_PATH && (
          <Button href={ADD_MISSION_PATH} type="primary" icon={<GrFormAdd />} className="h-9 rounded-lg">
            <span className="lowercase text-sm xl:text-base font-normal">Add mission</span>
          </Button>
        )}
        {isMissionDetails && (
          <Button type="primary" icon={<FaDiscord />} className="h-9 rounded-lg" onClick={() => isOpen(true)}>
            <span className="lowercase text-sm xl:text-base font-normal">Publish</span>
          </Button>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-3 flex-1">{children}</div>
      <Footer />
      <Modal centered className="min-w-[600px]" footer={null} open={open} onCancel={() => isOpen(false)} closeIcon={null}>
        <Form form={form}>
          <ChooseDiscordChannel />
          <div className="flex w-full items-center justify-end mt-4 gap-x-2">
            <Button
              onClick={() => {
                isOpen(false);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => {
                  form.validateFields().then(() => {
                    const values = form.getFieldsValue(formFields);
                    const id = pathname.split("/").pop() as string;
                    sendDiscordMessage(
                      {
                        channel_id: values.channel_id,
                        role_ids: values.role_ids,
                        mission_id: Number(id),
                        content: values.content === undefined ? "" : values.content,
                      },
                      {
                        onSuccess: () => {
                          isOpen(false);
                          message.success("Message sent successfully");
                          form.resetFields();
                        },
                      }
                    );
                  });
                }}
              >
                Send
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default MissionsLayout;
