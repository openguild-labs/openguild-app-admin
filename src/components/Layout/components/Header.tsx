import { HEADER_HEIGHT } from "@/constants/dimensions";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setShowed } from "@/redux/slides/showDrawer";
import { Avatar } from "@mui/material";
import { SlMenu } from "react-icons/sl";

function Header() {
  const dispatch = useAppDispatch();
  return (
    <header
      className="flex items-center w-full p-5 bg-neutral-100 transition-effect"
      style={{
        height: HEADER_HEIGHT,
      }}
    >
      <div className="bg-white w-full h-full rounded-lg shadow-md flex items-center justify-between lg:justify-end p-3">
        <button
          className="p-2 lg:hidden"
          onClick={() => {
            dispatch(setShowed());
          }}
        >
          <SlMenu size={20} className="text-primary-color" />
        </button>
        <div className="flex items-center gap-x-2">
          <h2 className="text-neutral-700 text-lg">Administrator</h2>
          <Avatar>AD</Avatar>
        </div>
      </div>
    </header>
  );
}

export default Header;
