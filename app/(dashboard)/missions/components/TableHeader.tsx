import { styled, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import colors from "@/config/colors";
import { IoIosSearch } from "react-icons/io";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDebouncedValue } from "@mantine/hooks";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setSearchingTitle } from "@/redux/slides/missionQuery";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: colors["primary-color"],
  },
}));

function TableHeader() {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchDebouncedValue] = useDebouncedValue(searchValue, 500);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchingTitle(searchDebouncedValue));
  }, [searchDebouncedValue, dispatch]);

  return (
    <>
      <TableHead>
        <TableRow>
          <StyledTableCell className="w-[40%] min-w-[380px]">
            <div className="text-white font-bold text-sm xl:text-base my-2 border-r border-white flex justify-between items-center cell-header">
              <span>Title</span>
              <div className="flex-center mr-2 gap-x-1">
                <div
                  className="transition-effect overflow-hidden rounded-full"
                  style={{
                    width: showSearchInput ? "200px" : "0px",
                  }}
                >
                  <Input
                    className="transition-effect text-xs xl:text-sm h-6 font-normal rounded-full"
                    style={{
                      paddingInline: "12px",
                    }}
                    placeholder="enter the mission title"
                    value={searchValue}
                    onChange={(event) => {
                      setSearchValue(event.target.value);
                    }}
                  />
                </div>
                <button
                  className="p-1 rounded-full hover:bg-white/20 transition-effect"
                  onClick={() => {
                    if (showSearchInput) setSearchValue("");
                    setShowSearchInput(!showSearchInput);
                  }}
                >
                  {showSearchInput ? <RxCross2 size={16} /> : <IoIosSearch size={16} />}
                </button>
              </div>
            </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm xl:text-base my-2 border-r border-white min-w-[140px]">
              <span>Status</span>
            </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm xl:text-base my-2 border-r border-white min-w-[100px]">Participants</div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm xl:text-base my-2 min-w-[90px] flex justify-between items-center">Created at</div>
          </StyledTableCell>
          <StyledTableCell />
        </TableRow>
      </TableHead>
    </>
  );
}

export default TableHeader;
