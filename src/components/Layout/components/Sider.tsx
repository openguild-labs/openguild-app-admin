import { COLLAPSED_SIDER_WIDTH, HEADER_HEIGHT, SIDER_WIDTH } from "@/constants/dimensions";
import { HOME_PATH, MISSIONS_PATH, USERS_PATH } from "@/constants/links";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import CollapsedWrapper from "./CollapsedWrapper";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { collapsedSiderStore, setCollapsed } from "@/redux/slides/collapsedSider";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const linkItems = [
  {
    label: "Users",
    icon: <FaRegUser size={18} />,
    to: USERS_PATH,
  },
  {
    label: "Missions",
    icon: <BiTask size={18} />,
    to: MISSIONS_PATH,
  },
];

function Sider() {
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { value: collapsed } = useAppSelector(collapsedSiderStore);
  const dispatch = useAppDispatch();

  return (
    <aside
      className="h-screen bg-white shadow-md transition-effect"
      style={{
        width: collapsed ? COLLAPSED_SIDER_WIDTH : SIDER_WIDTH,
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
          <Link to={HOME_PATH} className="font-bold text-xl text-primary-color ml-6">
            ChainCohort
          </Link>
        </CollapsedWrapper>
        <button
          className="w-5 aspect-square rounded-full flex items-center justify-center border-[3px] border-primary-color shrink-0"
          onClick={() => {
            dispatch(setCollapsed(!collapsed));
          }}
        >
          {!collapsed && <div className="w-[6px] aspect-square bg-primary-color rounded-full" />}
        </button>
      </div>
      <Tabs
        value={value}
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
                      <span className="w-full">{item.label}</span>
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
  );
}

export default Sider;
