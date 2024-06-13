import { COLLAPSED_SIDER_WIDTH, HEADER_HEIGHT, SIDER_WIDTH } from "@/constants/dimensions";
import { HOME_PATH, MISSIONS_PATH, USERS_PATH } from "@/constants/links";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import CollapsedWrapper from "./CollapsedWrapper";
import logo from "@/assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { closeDrawer, layoutStore, setCollapsedSider } from "@/redux/slides/layout";

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
    label: "Mission",
    icon: <BiTask size={18} />,
    to: MISSIONS_PATH,
  },
];

function Sider() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentTabIndex = linkItems.findIndex((item) => currentPath.includes(item.to));

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
        className="fixed top-0 left-0 bottom-0 bg-white shadow-md transition-effect xl:block hidden z-20"
        style={{
          width: collapsed ? COLLAPSED_SIDER_WIDTH : SIDER_WIDTH,
          minWidth: collapsed ? COLLAPSED_SIDER_WIDTH : SIDER_WIDTH,
        }}
      >
        <div
          className="flex items-center px-2"
          style={{
            height: HEADER_HEIGHT,
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          <CollapsedWrapper collapsed={collapsed}>
            <Link to={HOME_PATH} className="w-full h-full flex items-center justify-start">
              <img src={logo} alt="logo" className="w-[70%]" />
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
                        <span className="w-full text-sm md:text-base">{item.label}</span>
                      </CollapsedWrapper>
                    </span>
                  </div>
                }
                {...a11yProps(index)}
                component={Link}
                to={item.to}
              />
            );
          })}
        </Tabs>
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
              <Link to={HOME_PATH} className="w-full h-full flex items-center justify-start">
                <img src={logo} alt="logo" className="w-[70%]" />
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
                  <ListItemButton component={Link} to={item.to}>
                    <ListItemIcon
                      style={{
                        color: currentTabIndex === index ? "#fff" : "#000",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={<span className="text-sm md:text-base">{item.label}</span>}
                      style={{
                        color: currentTabIndex === index ? "#fff" : "#000",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Sider;
