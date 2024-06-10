import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import StyledMenu from "./StyledMenu";
import { MenuItem } from "@mui/material";
// import { IoSearchOutline } from "react-icons/io5";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { resetField, setField, userFilterStore } from "@/redux/slides/userFilter";

const DEFAULT = "default";
const ASC = "asc";
const DESC = "desc";

type TIconOption = {
  type: string;
  node: React.ReactNode;
};

const defaultIcon: TIconOption = {
  type: DEFAULT,
  node: <TiArrowSortedDown size={20} />,
};

interface IOptionsProps {
  keyOption: keyof TUserModel;
}

function Options({ keyOption: key }: IOptionsProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [icon, setIcon] = useState<TIconOption>(defaultIcon);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };
  const { field } = useAppSelector(userFilterStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (key !== field) {
      setIcon(defaultIcon);
    }
  }, [key, field]);

  return (
    <>
      <button
        onClick={handleClick}
        className="transition-effect flex-center w-6 h-6 mr-2 rounded-full hover:cursor-pointer hover:bg-neutral-100/30"
      >
        {icon.node}
      </button>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="w-[200px]"
      >
        <MenuItem
          onClick={(event) => {
            if (icon.type === ASC) {
              setIcon(defaultIcon);
              dispatch(resetField());
            } else {
              setIcon({
                type: ASC,
                node: <FaSortAlphaDown />,
              });
              dispatch(setField({ field: key, isAsc: true }));
            }
            handleClose(event);
          }}
        >
          Sort from A to Z <FaSortAlphaDown />
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            if (icon.type === DESC) {
              setIcon(defaultIcon);
              dispatch(resetField());
            } else {
              setIcon({
                type: DESC,
                node: <FaSortAlphaDownAlt />,
              });
              dispatch(setField({ field: key, isAsc: false }));
            }
            handleClose(event);
          }}
        >
          Sort from Z to A <FaSortAlphaDownAlt />
        </MenuItem>
      </StyledMenu>
    </>
  );
}

export default Options;
