import { useGetUsers } from "@/supabase/api/user/services";
import { Breadcrumbs, Table, TableContainer, Typography } from "@mui/material";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import TableWrapper from "./components/TableWrapper";
import { useSelector } from "react-redux";
import Pagination from "./components/Pagination";
import { userFilterStore } from "@/redux/slides/userFilter";

function Users() {
  const userFilter = useSelector(userFilterStore);
  const { data, isLoading } = useGetUsers(userFilter);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-start h-10 mb-4">
        <div className="flex items-end">
          <h1 className="text-primary-color font-bold text-2xl md:text-3xl pr-3 mr-3 border-r-2 border-primary-color">User</h1>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">
              <span className="text-base md:text-lg">list</span>
            </Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-3 flex-1">
        <TableContainer component={TableWrapper}>
          <Table stickyHeader aria-label="simple table">
            <TableHeader />
            <TableBody data={data?.list || []} isLoading={isLoading} />
          </Table>
        </TableContainer>
        <Pagination total={data?.total || 0} />
      </div>
    </div>
  );
}

export default Users;
