import { useGetUsers } from "@/supabase/api/user/services";
import { Table, TableContainer } from "@mui/material";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import TableWrapper from "./components/TableWrapper";
import { useSelector } from "react-redux";
import { userSortedFieldStore } from "@/redux/slides/userSortedField";

function Users() {
  const sortedField = useSelector(userSortedFieldStore);
  const { data, isLoading } = useGetUsers(sortedField);

  return (
    <div className="">
      <TableContainer component={TableWrapper}>
        <Table aria-label="simple table">
          <TableHeader />
          <TableBody data={data || []} isLoading={isLoading} />
        </Table>
      </TableContainer>
    </div>
  );
}

export default Users;
