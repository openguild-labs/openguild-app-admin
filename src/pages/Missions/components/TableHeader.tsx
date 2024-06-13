import { styled, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import colors from "@/config/colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: colors["primary-color"],
  },
}));

function TableHeader() {
  return (
    <>
      <TableHead>
        <TableRow>
          <StyledTableCell className="w-[40%] min-w-[380px]">
            <div className="text-white font-bold text-sm md:text-base my-2 border-r border-white flex justify-between items-center cell-header">
              <span>Title</span>
            </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm md:text-base my-2 border-r border-white min-w-[140px]">Status </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm md:text-base my-2 border-r border-white min-w-[100px]">Participants</div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm md:text-base my-2 min-w-[90px] flex justify-between items-center">Created at</div>
          </StyledTableCell>
        </TableRow>
      </TableHead>
    </>
  );
}

export default TableHeader;
