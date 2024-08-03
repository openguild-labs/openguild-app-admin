import { Collapse, IconButton, TableCell, TableRow as TableRowMUI } from "@mui/material";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineDiscord } from "react-icons/ai";
import { LiaGithub } from "react-icons/lia";
import { CiFacebook } from "react-icons/ci";

interface ITableRowProps {
  data: TUserModel;
}

function TableRow({ data }: ITableRowProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRowMUI>
        <TableCell sx={{ padding: "4px" }}>
          <div className="flex-center w-full h-full">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </IconButton>
          </div>
        </TableCell>
        <TableCell className="w-[30%]">
          <div className="max-w-[280px]">
            <span className="text-start text-ellipsis line-clamp-1">{data.email}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="text-sm xl:text-base">{data.wallet_address.substring(0, 5) + "..." + data.wallet_address.slice(-5)}</div>
        </TableCell>
        <TableCell>
          <div className="max-w-[140px] text-sm xl:text-base text-ellipsis line-clamp-1 overflow-hidden">{data.first_name || "--"}</div>
        </TableCell>
        <TableCell>
          <div className="max-w-[140px] text-sm xl:text-base text-ellipsis line-clamp-1 overflow-hidden">{data.last_name || "--"}</div>
        </TableCell>
        <TableCell align="center">
          <div className="flex justify-center">{data.is_student && <FaCheckCircle className="text-green-500 text-base xl:text-lg" />}</div>
        </TableCell>
      </TableRowMUI>
      <TableRowMUI className="bg-neutral-100">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex items-center justify-center py-3">
              <div className="w-1/2 flex flex-col gap-y-2">
                <div className="flex items-center justify-start gap-x-2">
                  <FaXTwitter size={20} />
                  <span className="text-sm xl:text-base">{data.twitter || "--"}</span>
                </div>
                <div className="flex items-center justify-start gap-x-2">
                  <AiOutlineDiscord size={20} />
                  <span className="text-sm xl:text-base">{data.discord || "--"}</span>
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-y-2">
                <div className="flex items-center justify-start gap-x-2">
                  <LiaGithub size={22} />
                  <span className="text-sm xl:text-base">{data.github || "--"}</span>
                </div>
                <div className="flex items-center justify-start gap-x-2">
                  <CiFacebook size={20} />
                  <span className="text-sm xl:text-base">{data.facebook || "--"}</span>
                </div>
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRowMUI>
    </>
  );
}

export default TableRow;
