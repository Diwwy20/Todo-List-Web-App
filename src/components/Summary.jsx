import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTaskContext } from "@/context/TaskContext.jsx";
import { STATUS } from "@/constants/status";
import { LayoutDashboard, ListTodo, Clock, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "./MyTask/CustomDateInput";
import { useTranslation } from "react-i18next";
import { translateStatus } from "@/utils/translate";

const Summary = () => {
  const { t } = useTranslation();
  const { tasks } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (!selectedDate) return true;
    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getFullYear() === selectedDate.getFullYear() &&
      taskDate.getMonth() === selectedDate.getMonth()
    );
  });

  const statusData = [
    {
      name: "To_Do",
      value: filteredTasks.filter((task) => task.status === STATUS.TODO).length,
      color: "#FF8042",
      icon: <ListTodo className="w-5 h-5" />,
    },
    {
      name: "In_Progress",
      value: filteredTasks.filter((task) => task.status === STATUS.IN_PROGRESS)
        .length,
      color: "#0088FE",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      name: "Completed",
      value: filteredTasks.filter((task) => task.status === STATUS.COMPLETED)
        .length,
      color: "#00C49F",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      name: "Overdue",
      value: filteredTasks.filter(
        (task) => task.dueDateStatus === STATUS.OVERDUE && !task.completed
      ).length,
      color: "#FFBB28",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
  ];

  const totalTasks = filteredTasks.length;
  const completedPercentage = totalTasks
    ? (filteredTasks.filter((task) => task.status === STATUS.COMPLETED).length /
        totalTasks) *
      100
    : 0;

  const recentTasks = [...filteredTasks]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 5);

  return (
    <div className="flex-1 p-6 lg:ml-0 dark:bg-gray-300 dark:min-h-screen">
      <div className="flex items-center gap-3 my-8">
        <LayoutDashboard className="w-8 h-8 text-indigo-600" />
        <h2 className="text-gray-500 text-3xl font-bold dark:text-black">
          {t("Dashboard_Summary")}
        </h2>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          placeholderText={t("Select_Month_Year")}
          className="p-2 border rounded-lg"
          customInput={<CustomDateInput />}
          isClearable
        />
      </div>

      {/* ----- 4 Stat Boxes ----- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statusData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow dark:bg-gray-400"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-white">
                  {t(item.name)}
                </p>
                <p className="text-2xl font-bold mt-1">{item.value}</p>
              </div>
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <div className="text-gray-700">{item.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ----- Main Content ----- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ----- Pie Chart Section ----- */}
        <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-400">
          <h3 className="text-gray-600 text-lg mb-4 dark:text-white">
            {t("Status")}
          </h3>
          <div
            className="flex justify-center items-center relative mb-6"
            style={{ height: 200 }}
          >
            {totalTasks > 0 ? (
              <PieChart width={200} height={200}>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-black">
                {t("No_Task_To_Display")}
              </div>
            )}
          </div>

          {/* ----- Status Text (Legend) ----- */}
          <div className="flex justify-around text-gray-700 text-sm mb-4">
            <div className="space-y-2">
              {statusData.slice(0, 2).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <p className="dark:text-white">
                    {t(item.name)}: {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {statusData.slice(2).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <p className="dark:text-white">
                    {t(item.name)}: {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ----- Task Stats ----- */}
          <div className="flex justify-around text-center mt-10">
            <div>
              <p className="text-xl font-bold">{totalTasks}</p>
              <p className="text-sm">{t("Task")}</p>
            </div>
            <div>
              <p className="text-xl font-bold">
                {completedPercentage.toFixed(2)}%
              </p>
              <p className="text-sm">{t("Completed")}</p>
            </div>
          </div>

          {/* ----- Progress Bar ----- */}
          <div className="mt-4 bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* ----- Recently Task Section ----- */}
        <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-400">
          <h3 className="text-gray-600 text-lg mb-4 dark:text-white">
            {t("Recently_Added_Tasks")}
          </h3>
          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition dark:bg-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {task.title}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        task.status === STATUS.COMPLETED
                          ? "bg-green-100 text-green-600"
                          : task.status === STATUS.IN_PROGRESS
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {translateStatus(task.status, t)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {t("Due")} {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-black">
                <p>No tasks added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
