import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { MenuItem } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { resetField, setField, userQueryStore } from "@/redux/slides/userQuery";
import StyledMenu from "@/components/StyledMenu";

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

function Options({ keyOption }: IOptionsProps): JSX.Element {
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
  const { field, isAsc } = useAppSelector(userQueryStore);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (keyOption !== field) {
      setIcon(defaultIcon);
    } else {
      if (isAsc) {
        setIcon({
          type: ASC,
          node: <FaSortAlphaDown />,
        });
      } else {
        setIcon({
          type: DESC,
          node: <FaSortAlphaDownAlt />,
        });
      }
    }
  }, [keyOption, field, isAsc]);

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
          sx={{
            backgroundColor: field === keyOption && isAsc ? "rgba(40, 18, 62, .15) !important" : undefined,
          }}
          onClick={(event) => {
            if (icon.type === ASC) {
              setIcon(defaultIcon);
              dispatch(resetField());
            } else {
              dispatch(setField({ field: keyOption, isAsc: true }));
            }
            handleClose(event);
          }}
        >
          Sort from A to Z {field === keyOption && isAsc ? <RxCross2 /> : <FaSortAlphaDown />}
        </MenuItem>
        <MenuItem
          sx={{
            backgroundColor: field === keyOption && !isAsc ? "rgba(40, 18, 62, .15) !important" : undefined,
          }}
          onClick={(event) => {
            if (icon.type === DESC) {
              setIcon(defaultIcon);
              dispatch(resetField());
            } else {
              dispatch(setField({ field: keyOption, isAsc: false }));
            }
            handleClose(event);
          }}
        >
          Sort from Z to A {field === keyOption && !isAsc ? <RxCross2 /> : <FaSortAlphaDownAlt />}
        </MenuItem>
      </StyledMenu>
    </>
  );
}

export default Options;
