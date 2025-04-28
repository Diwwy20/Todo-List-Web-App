import React from "react";
import TaskItem from "./TaskItem";
import { useTranslation } from "react-i18next";

const TaskListView = ({ todayTasks, overdueTasks, taskItemProps }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-6 ">
        <h3 className="text-gray-500 text-lg font-semibold mb-2 dark:text-black">
          {t("Today_Task")}
        </h3>
        <div className="bg-white dark:bg-gray-400 p-4 rounded-lg shadow">
          {todayTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4 dark:text-black">
              {t("No_Task_For_Today")}
            </p>
          ) : (
            todayTasks.map((task) => (
              <TaskItem key={task.id} task={task} {...taskItemProps} />
            ))
          )}
        </div>
      </div>

      {/* Overdue Tasks */}
      <div className="mb-6">
        <h3 className="text-gray-500 dark:text-black text-lg font-semibold mb-2">
          {t("Overdue_Task")}
        </h3>
        <div className="bg-white dark:bg-gray-400 p-4 rounded-lg shadow">
          {overdueTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4 dark:text-black">
              {t("No_Overdue_Task")}
            </p>
          ) : (
            overdueTasks.map((task) => (
              <TaskItem key={task.id} task={task} {...taskItemProps} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TaskListView;
