import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TaskTable from "@/app/tasks/TaskTable";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Task table",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tasks" />

      <div className="flex flex-col gap-10">
        <TaskTable />
      </div>
    </DefaultLayout>
  );
};
export default TablesPage;
