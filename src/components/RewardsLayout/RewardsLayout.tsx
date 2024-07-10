import { ADD_REWARD_PATH, REWARDS_PATH } from "@/constants/links";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { GrFormAdd } from "react-icons/gr";
import { Outlet, useLocation } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { rewardDetailsPathRegex } from "@/constants/regex";
import { Button } from "antd";

const getLastBreadcrumbLabel = (pathname: string) => {
  switch (true) {
    case rewardDetailsPathRegex.test(pathname):
      return "details";
    case pathname === ADD_REWARD_PATH:
      return "add";
    default:
      return "list";
  }
};

function RewardsLayout() {
  const { pathname } = useLocation();
  const isAddReward = pathname === ADD_REWARD_PATH;
  const isRewardDetails = rewardDetailsPathRegex.test(pathname);
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between h-10 mb-4">
        <div className="flex items-end">
          <h1 className="text-primary-color font-bold text-2xl xl:text-3xl pr-3 mr-3 border-r-2 border-primary-color">Reward</h1>
          <Breadcrumbs separator={<GoChevronRight />} aria-label="breadcrumb">
            {(isAddReward || isRewardDetails) && (
              <Link underline="hover" color="inherit" href={REWARDS_PATH}>
                <span className="text-base xl:text-lg">list</span>
              </Link>
            )}
            <Typography color="text.primary">
              <span className="font-bold text-base xl:text-lg">{getLastBreadcrumbLabel(pathname)}</span>
            </Typography>
          </Breadcrumbs>
        </div>
        {pathname === REWARDS_PATH && (
          <Button href={ADD_REWARD_PATH} type="primary" icon={<GrFormAdd />} className="h-9 rounded-lg">
            <span className="lowercase text-sm xl:text-base font-normal">Add reward</span>
          </Button>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-3 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default RewardsLayout;
