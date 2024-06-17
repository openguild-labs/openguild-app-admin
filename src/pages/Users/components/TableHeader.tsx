import { styled, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import Options from "./Options";
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
          <StyledTableCell className="w-[30%] min-w-[300px]">
            <div className="text-white font-bold text-sm xl:text-base my-2 border-r border-white flex justify-between items-center cell-header">
              Email
              <Options keyOption="email" />
            </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm xl:text-base my-2 border-r border-white min-w-[140px]">Wallet Address </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm xl:text-base my-2 border-r border-white min-w-[140px] flex justify-between items-center">
              First Name <Options keyOption="first_name" />
            </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-sm xl:text-base my-2 border-r border-white min-w-[140px] flex justify-between items-center">
              Last Name <Options keyOption="last_name" />
            </div>
          </StyledTableCell>
          <StyledTableCell align="center">
            <div className="text-white font-bold text-sm xl:text-base">Student</div>
          </StyledTableCell>
        </TableRow>
      </TableHead>
    </>
  );
}

export default TableHeader;
