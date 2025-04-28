import React from "react";
import { STATUS } from "@/constants/status";
import { formatDate } from "@/utils/dateUtils";
import { useTranslation } from "react-i18next";
import { translateDueDateStatus, translateStatus } from "@/utils/translate";

const TaskItem = ({
  task,
  toggleComplete,
  updateTaskStatus,
  setEditingTask,
  confirmDeleteTask,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center border-b border-gray-200 py-3 last:border-0 ">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        className="mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 cursor-pointer"
      />

      <div className="flex-1 flex flex-col sm:flex-row sm:items-center">
        <div className="flex-1">
          <p
            className={`${task.completed ? "line-through text-gray-500" : ""}`}
          >
            {task.title}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                task.status === STATUS.TODO
                  ? "bg-gray-200 text-gray-700"
                  : task.status === STATUS.IN_PROGRESS
                  ? "bg-blue-200 text-blue-700"
                  : "bg-green-200 text-green-700"
              }`}
            >
              {translateStatus(task.status, t)}
            </span>

            {task.dueDateStatus && (
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  task.dueDateStatus === STATUS.OVERDUE
                    ? "bg-red-200 text-red-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {translateDueDateStatus(task.dueDateStatus, t)}
              </span>
            )}

            <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">
              {t("Due")} {formatDate(task.dueDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center mt-2 sm:mt-0">
          {!task.completed && (
            <select
              value={task.status}
              onChange={(e) => updateTaskStatus(task.id, e.target.value)}
              className="mr-2 text-sm border rounded px-2 py-1 cursor-pointer dark:bg-gray-200 dark:text-black"
            >
              <option value={STATUS.TODO}>{t("status.todo")}</option>
              <option value={STATUS.IN_PROGRESS}>
                {t("status.in_progress")}
              </option>
              <option value={STATUS.COMPLETED}>{t("status.completed")}</option>
            </select>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={() => setEditingTask(task)}
              className="ml-2 text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              ✏️
            </button>

            <button
              onClick={() => confirmDeleteTask(task)}
              className="ml-2 hover:text-red-700 cursor-pointer dark:bg-gray-100 rounded-full"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
