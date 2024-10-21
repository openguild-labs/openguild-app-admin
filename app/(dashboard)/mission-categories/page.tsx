"use client";
import { Table, TableContainer } from "@mui/material";
import Header from "./components/Header";
import TableWrapper from "@/components/TableWrapper";
import TableHeader from "./components/TableHeader";
import { useListMissionCategories, useDeleteMissionCategory } from "@/supabase/api/missionCategory/service";
import TableBody from "./components/TableBody";
import { useAppSelector } from "@/redux/reduxHooks";
import { missionCategoryQueryStore } from "@/redux/slides/missionCategoryQuery";
import Pagination from "./components/Pagination";
import { Suspense } from "react";

function MissionCategories() {
  const missionCategoryQuery = useAppSelector(missionCategoryQueryStore);
  const { data, isLoading, refetch } = useListMissionCategories(missionCategoryQuery);
  const { mutate } = useDeleteMissionCategory();

  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <div className="bg-white shadow-md rounded-lg p-3 flex-1">
        <TableContainer component={TableWrapper}>
          <Table stickyHeader aria-label="user table">
            <TableHeader />
            <TableBody
              data={data || []}
              isLoading={isLoading}
              onDelete={(id) => {
                mutate(id, {
                  onSuccess: (resp) => {
                    if (resp) refetch();
                  },
                });
              }}
            />
          </Table>
          <Suspense>
            <Pagination />
          </Suspense>
        </TableContainer>
      </div>
    </div>
  );
}

export default MissionCategories;
