"use client";
import React from "react";
import DataStatsOne from "@/app/Dashboard/DataStatsOne";
import TaskTable from "../tasks/TaskTable";

const Dashboard: React.FC = () => {
  return (
    <>
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <TaskTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
