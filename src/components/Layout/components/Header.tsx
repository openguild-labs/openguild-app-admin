import { COLLAPSED_SIDER_WIDTH, HEADER_HEIGHT, SIDER_WIDTH } from "@/constants/dimensions";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { layoutStore, toggleDrawer } from "@/redux/slides/layout";
import { Avatar } from "@mui/material";
import { SlMenu } from "react-icons/sl";
import "./style.css";

function Header() {
  const dispatch = useAppDispatch();
  const { isCollapsedSider: collapsed } = useAppSelector(layoutStore);

  return (
    <header
      className={`transition-effect fixed top-0 right-0 left-0 z-20 ${
        collapsed ? `layout-header-${COLLAPSED_SIDER_WIDTH}` : `layout-header-${SIDER_WIDTH}`
      }`}
      style={{
        height: HEADER_HEIGHT,
      }}
    >
      <div className="flex flex-col items-center w-full px-5 pt-5 relative">
        <div className="h-10 bg-neutral-100 absolute top-0 left-0 right-[10px] z-0" />
        <div className="bg-white z-10 transition-effect w-full h-[60px] rounded-lg shadow-md flex items-center justify-between xl:justify-end p-3">
          <button
            className="p-2 xl:hidden"
            onClick={() => {
              dispatch(toggleDrawer());
            }}
          >
            <SlMenu size={20} className="text-primary-color" />
          </button>
          <div className="flex items-center gap-x-2">
            <h2 className="text-neutral-700 text-base xl:text-lg">Administrator</h2>
            <Avatar>AD</Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
