"use client";
import { COLLAPSED_SIDER_WIDTH, HEADER_HEIGHT, SIDER_WIDTH } from "@/constants/dimensions";
import { HOME_PATH, MISSIONS_CATEGORIES_PATH, MISSIONS_PATH, REWARDS_PATH, USERS_PATH } from "@/constants/links";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import CollapsedWrapper from "./CollapsedWrapper";
import logo from "@/assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { closeDrawer, layoutStore, setCollapsedSider } from "@/redux/slides/layout";
import { TbCategoryPlus } from "react-icons/tb";
import { IoGiftOutline } from "react-icons/io5";
import "./style.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { TbLogout2 } from "react-icons/tb";
import { useSignOut } from "@/supabase/api/auth/services";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const linkItems = [
  {
    label: "User",
    icon: <FaRegUser size={18} />,
    to: USERS_PATH,
  },
  {
    label: "Mission Category",
    icon: <TbCategoryPlus size={18} />,
    to: MISSIONS_CATEGORIES_PATH,
  },
  {
    label: "Mission",
    icon: <BiTask size={18} />,
    to: MISSIONS_PATH,
  },
  {
    label: "Reward",
    icon: <IoGiftOutline size={18} />,
    to: REWARDS_PATH,
  },
];

interface ILogOutButtonProps {
  collapsed: boolean;
}

const LogOutButton = ({ collapsed }: ILogOutButtonProps) => {
  const { mutate } = useSignOut();
  return (
    <button
      className="transition-effect w-full absolute bottom-0 p-4 border-t border-neutral-300 flex items-center gap-x-4 hover:bg-primary-color/10"
      style={{
        justifyContent: collapsed ? "center" : "flex-start",
      }}
      onClick={() => {
        mutate();
      }}
    >
      <TbLogout2 />
      <span
        style={{
          width: collapsed ? 0 : "auto",
        }}
      >
        <CollapsedWrapper collapsed={collapsed}>
          <span className="w-full text-base capitalize overflow-hidden text-nowrap">Log out</span>
        </CollapsedWrapper>
      </span>
    </button>
  );
};

function Sider() {
  const pathname = usePathname();
  const currentTabIndex = linkItems.findIndex((item) => pathname.includes(item.to));

  const [tabValue, setTabValue] = useState(currentTabIndex > -1 ? currentTabIndex : 0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const dispatch = useAppDispatch();
  const { isOpenedDrawer } = useAppSelector(layoutStore);
  const { isCollapsedSider: collapsed } = useAppSelector(layoutStore);

  return (
    <>
      <aside
        className={`fixed top-0 left-0 bottom-0 bg-white shadow-md transition-effect z-30 ${
          collapsed ? `layout-sider-${COLLAPSED_SIDER_WIDTH}` : `layout-sider-${SIDER_WIDTH}`
        }`}
      >
        <div
          className="flex items-center px-2"
          style={{
            height: HEADER_HEIGHT,
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          <CollapsedWrapper collapsed={collapsed}>
            <Link href={HOME_PATH}>
              <div className="w-full h-full flex items-center justify-start">
                <Image src={logo} alt="logo" className="w-[70%]" />
              </div>
            </Link>
          </CollapsedWrapper>
          <button
            className="w-5 aspect-square rounded-full flex items-center justify-center border-[3px] border-primary-color shrink-0"
            onClick={() => {
              dispatch(setCollapsedSider(!collapsed));
            }}
          >
            {!collapsed && <div className="w-[6px] aspect-square bg-primary-color rounded-full" />}
          </button>
        </div>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          className="w-full"
          style={{
            borderColor: "transparent",
          }}
          orientation="vertical"
        >
          {linkItems.map((item, index) => {
            return (
              <Tab
                key={index}
                sx={{
                  width: "100%",
                }}
                LinkComponent={Link}
                href={item.to}
                label={
                  <div
                    className="w-full h-full flex items-center gap-x-4"
                    style={{
                      justifyContent: collapsed ? "center" : "flex-start",
                    }}
                  >
                    {item.icon}
                    <span
                      style={{
                        width: collapsed ? 0 : "auto",
                      }}
                    >
                      <CollapsedWrapper collapsed={collapsed}>
                        <span className="w-full text-base capitalize overflow-hidden text-nowrap">{item.label}</span>
                      </CollapsedWrapper>
                    </span>
                  </div>
                }
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
        <LogOutButton collapsed={collapsed} />
      </aside>
      <Drawer
        open={isOpenedDrawer}
        onClose={() => {
          dispatch(closeDrawer());
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => {
            dispatch(closeDrawer());
          }}
        >
          <List>
            <ListItem className="mb-4">
              <Link href={HOME_PATH}>
                <div className="w-full h-full flex items-center justify-start">
                  <Image src={logo} alt="logo" className="w-[70%]" />
                </div>
              </Link>
            </ListItem>
            {linkItems.map((item, index) => {
              return (
                <ListItem
                  disablePadding
                  key={index}
                  className="ml-2 mb-1 rounded-l-lg overflow-hidden"
                  style={{
                    backgroundColor: currentTabIndex === index ? "#28123E" : "transparent",
                  }}
                >
                  <ListItemButton
                    sx={{
                      width: "100%",
                    }}
                    LinkComponent={Link}
                    href={item.to}
                  >
                    <ListItemIcon
                      style={{
                        color: currentTabIndex === index ? "#fff" : "#000",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={<span className="text-base">{item.label}</span>}
                      style={{
                        color: currentTabIndex === index ? "#fff" : "#000",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <LogOutButton collapsed={collapsed} />
        </Box>
      </Drawer>
    </>
  );
}

export default Sider;
