import { styled, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import Options from "./Options";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function TableHeader() {
  return (
    <>
      <TableHead className="bg-primary-color">
        <TableRow>
          <StyledTableCell className="w-[30%]">
            <div className="text-white font-bold text-base my-2 border-r border-white flex justify-between items-center cell-header">
              Email
              <Options keyOption="email" />
            </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-base my-2 border-r border-white">Wallet Address </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-base my-2 border-r border-white flex justify-between items-center">
              First Name <Options keyOption="first_name" />
            </div>
          </StyledTableCell>
          <StyledTableCell>
            <div className="text-white font-bold text-base my-2 border-r border-white flex justify-between items-center">
              Last Name <Options keyOption="last_name" />
            </div>
          </StyledTableCell>
          <StyledTableCell align="center">
            <div className="text-white font-bold text-base">Student</div>
          </StyledTableCell>
        </TableRow>
      </TableHead>
    </>
  );
}

export default TableHeader;
