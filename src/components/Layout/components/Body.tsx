import { COLLAPSED_SIDER_WIDTH, HEADER_HEIGHT, SIDER_WIDTH } from "@/constants/dimensions";
import { useAppSelector } from "@/redux/reduxHooks";
import { layoutStore } from "@/redux/slides/layout";
import { Outlet } from "react-router-dom";
import "./style.css";

function Body() {
  const { isCollapsedSider: collapsed } = useAppSelector(layoutStore);
  return (
    <div
      className={`transition-effect px-5 w-full min-h-screen flex overflow-y-scroll ${
        collapsed ? `layout-body-${COLLAPSED_SIDER_WIDTH}` : `layout-body-${SIDER_WIDTH}`
      }`}
      style={{
        paddingTop: HEADER_HEIGHT,
      }}
    >
      <div className="w-full flex-1 flex flex-col mt-5 mb-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Body;
