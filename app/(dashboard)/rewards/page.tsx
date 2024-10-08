"use client";
import TableWrapper from "@/components/TableWrapper";
import { Table, TableContainer } from "@mui/material";
import TableHeader from "./components/TableHeader";
import { useDeleteReward, useListReward } from "@/supabase/api/reward/services";
import TableBody from "./components/TableBody";
import Pagination from "./components/Pagination";
import { useAppSelector } from "@/redux/reduxHooks";
import { rewardQueryStore } from "@/redux/slides/rewardQuery";
import { Suspense } from "react";

function Rewards() {
  const rewardQuery = useAppSelector(rewardQueryStore);
  const { data, isLoading, refetch } = useListReward(rewardQuery);
  const { mutate } = useDeleteReward();

  return (
    <div className="flex-1 flex flex-col">
      <TableContainer component={TableWrapper}>
        <Table aria-label="mission table">
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
  );
}

export default Rewards;
