import { dataStats } from "@/types/dataStats";
import { useGetTasks,  } from "@/hooks/tasks";

export const TaskData = () => {
  const { data, isError } = useGetTasks();

  if (isError) {
    console.log("Error while fetching tasks");
    return -1;
  }

  return (
    <>
      {data?.result.length ?? -1}
    </>
  );
}


export const GroupData: React.FC<{ input: string }> = ({ input }) => {

  return (
    <>
      {0}
    </>
  );
}

const dataStatsList = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26 26"
        width="26"
        height="26"
        fill="#ffffff"
      // className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    color: "#3FD97F",
    title: "Total Tasks",
    value: <TaskData />,
    growthRate: 0.43,
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
              {item.icon}
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
