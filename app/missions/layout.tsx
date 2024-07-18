"use client";
import { ADD_MISSION_PATH, MISSIONS_PATH } from "@/constants/links";
import { Breadcrumbs, Typography } from "@mui/material";
import { GrFormAdd } from "react-icons/gr";
import { GoChevronRight } from "react-icons/go";
import { missionDetailsPathRegex } from "@/constants/regex";
import { Button } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

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

function MissionsLayout({ children }: IMissionsLayoutProps) {
  const pathname = usePathname();
  const isAddMission = pathname === ADD_MISSION_PATH;
  const isMissionDetails = missionDetailsPathRegex.test(pathname);
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
      </div>
      <div className="bg-white shadow-md rounded-lg p-3 flex-1">{children}</div>
    </div>
  );
}

export default MissionsLayout;
