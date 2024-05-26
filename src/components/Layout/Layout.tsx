import { Link, Outlet } from "react-router-dom";
import { HEADER_HEIGHT, SIDER_WIDTH } from "../../constants/dimensions";
import "./Layout.css";
import { HOME_PATH, MISSIONS_PATH, USERS_PATH } from "../../constants/links";
import { Avatar, Tab, Tabs } from "@mui/material";
import { useState } from "react";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const linkItems = [
  {
    label: "Users",
    to: USERS_PATH,
  },
  {
    label: "Missions",
    to: MISSIONS_PATH,
  },
];

function Layout() {
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className="h-screen text-black bg-neutral-100">
      <article className="flex h-screen">
        <aside
          className="h-screen bg-white shadow-md"
          style={{
            width: SIDER_WIDTH,
          }}
        >
          <Link
            to={HOME_PATH}
            className="flex items-center justify-center"
            style={{
              height: HEADER_HEIGHT,
            }}
          >
            <h1 className="font-bold text-xl text-primary-color">ChainCohort</h1>
          </Link>
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
              return <Tab key={index} label={item.label} {...a11yProps(index)} component={Link} to={item.to} />;
            })}
          </Tabs>
        </aside>

        <div className="flex-1">
          <header
            className="flex items-center fixed top-0 right-0 pb-5 pr-5"
            style={{
              height: HEADER_HEIGHT,
              left: SIDER_WIDTH,
            }}
          >
            <div className="pt-5 pl-5 bg-neutral-100 w-full">
              <div className="bg-white w-full h-full rounded-lg shadow-md flex items-center justify-end p-3">
                <div className="flex items-center gap-x-2">
                  <h2 className="text-neutral-700 text-lg">Administrator</h2>
                  <Avatar>AD</Avatar>
                </div>
              </div>
            </div>
          </header>
          <div
            style={{
              paddingTop: HEADER_HEIGHT,
            }}
            className="px-5 pb-5 w-full h-full overflow-y-auto"
          >
            <Outlet />
          </div>
        </div>
      </article>
    </main>
  );
}

export default Layout;
