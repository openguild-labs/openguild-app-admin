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
          <StyledTableCell className="w-[30%]">
            <div className="text-white font-bold text-sm xl:text-base my-2 border-r border-white flex justify-between items-center cell-header">
              Name
            </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm xl:text-base my-2">Description</div>
          </StyledTableCell>
        </TableRow>
      </TableHead>
    </>
  );
}

export default TableHeader;
