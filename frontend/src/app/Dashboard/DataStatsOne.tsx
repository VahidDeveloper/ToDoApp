import { dataStats } from "@/types/dataStats";
import { useGetTasks } from "@/hooks/tasks";
import { useGetUsers } from "@/hooks/users";

function TaskData() {
  const { data } = useGetTasks();

  return (
    <>
      {data?.result.length ?? -1}
    </>
  );
}


function UserData() {
  const { data } = useGetUsers();

  return (
    <>
      {data?.result.length ?? -1}
    </>
  );
}

const dataStatsList = [
  {
    icon: "Group",
    color: "#3FD97F",
    title: "Total Users",
    value: <UserData />,
    growthRate: 0.43
  },
  {
    icon: "Task",
    color: "#3FD97F",
    title: "Total Tasks",
    value: <TaskData />,
    growthRate: 0.43
  }
];

const DataStatsOne: React.FC<dataStats> = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {dataStatsList.map((item, index) => (
          <div
            key={index}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
              style={{ backgroundColor: item.color }}
            >
              <span className="material-symbols-outlined">{item.icon}</span>

            </div>

            <div className="text-center">
              <h4 className="flex justify-center items-center mb-0 text-heading-2 font-bold text-dark dark:text-white">
                {item.value}
              </h4>
            </div>
            <div className="mt-1">
              <span className="text-body-sm font-medium">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataStatsOne;
