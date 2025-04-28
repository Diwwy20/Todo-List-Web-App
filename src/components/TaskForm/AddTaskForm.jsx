import React from "react";
import DatePicker from "react-datepicker";
import { STATUS } from "@/constants/status";
import { formatDateString } from "@/utils/dateUtils";
import { useTranslation } from "react-i18next";

export default function AddTaskForm({ newTask, setNewTask }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 ">
      <div>
        <label
          htmlFor="task-title"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          {t("Task_Name")}
        </label>
        <input
          id="task-title"
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder={t("Enter_Task_Name")}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="due-date"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          {t("Due_Date")}
        </label>
        <DatePicker
          selected={newTask.dueDate ? new Date(newTask.dueDate) : null}
          onChange={(date) =>
            setNewTask({ ...newTask, dueDate: formatDateString(date) })
          }
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="task-status"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          {t("Task_Status")}
        </label>
        <select
          id="task-status"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option
            value={STATUS.TODO}
            className="dark:bg-gray-200 dark:text-black"
          >
            {t("To_Do")}
          </option>
          <option
            value={STATUS.IN_PROGRESS}
            className="dark:bg-gray-200 dark:text-black"
          >
            {t("In_Progress")}
          </option>
          <option
            value={STATUS.COMPLETED}
            className="dark:bg-gray-200 dark:text-black"
          >
            {t("Completed")}
          </option>
        </select>
      </div>
    </div>
  );
}
