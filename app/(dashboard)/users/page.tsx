"use client";
import { useGetUsers } from "@/supabase/api/user/services";
import { Breadcrumbs, Table, TableContainer, Typography } from "@mui/material";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { useSelector } from "react-redux";
import Pagination from "./components/Pagination";
import { userQueryStore } from "@/redux/slides/userQuery";
import TableWrapper from "@/components/TableWrapper";
import { Suspense } from "react";

function Users() {
  const userQuery = useSelector(userQueryStore);
  const { data, isLoading } = useGetUsers(userQuery);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-start h-10 mb-4">
        <div className="flex items-end">
          <h1 className="text-primary-color font-bold text-2xl xl:text-3xl pr-3 mr-3 border-r-2 border-primary-color">User</h1>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">
              <span className="text-base xl:text-lg">list</span>
            </Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-3 flex-1">
        <TableContainer component={TableWrapper}>
          <Table stickyHeader aria-label="user table">
            <TableHeader />
            <TableBody data={data?.list || []} isLoading={isLoading} />
          </Table>
        </TableContainer>
        <Suspense>
          <Pagination total={data?.total || 0} />
        </Suspense>
      </div>
    </div>
  );
}

export default Users;
