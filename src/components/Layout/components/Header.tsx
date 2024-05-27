import { COLLAPSED_SIDER_WIDTH, HEADER_HEIGHT, SIDER_WIDTH } from "@/constants/dimensions";
import { collapsedSiderStore } from "@/redux/slides/collapsedSider";
import { useAppSelector } from "@/redux/reduxHooks";
import { Avatar } from "@mui/material";

function Header() {
  const { value: collapsed } = useAppSelector(collapsedSiderStore);
  return (
    <header
      className="flex items-center fixed top-0 right-0 pb-5 pr-5 transition-effect"
      style={{
        height: HEADER_HEIGHT,
        left: collapsed ? COLLAPSED_SIDER_WIDTH : SIDER_WIDTH,
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
  );
}

export default Header;
