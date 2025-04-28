import React from "react";
import { STATUS } from "@/constants/status";
import { formatDate } from "@/utils/dateUtils";
import { useTranslation } from "react-i18next";
import { translateDueDateStatus } from "@/utils/translate";

const DraggableTaskCard = ({
  task,
  draggedTask,
  handleDragStart,
  handleDragEnd,
  setEditingTask,
  confirmDeleteTask,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`p-3 bg-gray-100 dark:bg-gray-200 rounded-lg ${
        draggedTask?.id === task.id ? "opacity-50" : "opacity-100"
      } hover:shadow-md transition-all cursor-grab active:cursor-grabbing`}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, task)}
      onDragEnd={handleDragEnd}
      data-task-id={task.id}
    >
      <div className="flex justify-between mb-2">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            task.dueDateStatus === STATUS.OVERDUE
              ? "bg-red-200 text-red-700"
              : task.dueDateStatus === STATUS.DUE_TODAY
              ? "bg-yellow-200 text-yellow-700"
              : "bg-blue-200 text-blue-700"
          }`}
        >
          {translateDueDateStatus(task.dueDateStatus, t) || t("Upcoming")}
        </span>
        <div className="flex gap-1">
          <button onClick={() => setEditingTask(task)}>✏️</button>
          <button onClick={() => confirmDeleteTask(task)}>🗑️</button>
        </div>
      </div>
      <p
        className={`font-medium dark:text-black ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.title}
      </p>
      <div className="flex flex-wrap gap-1 mt-2">
        <p className="text-xs text-gray-500">
          {t("Due")}: {formatDate(task.dueDate)}
        </p>
      </div>
    </div>
  );
};

export default DraggableTaskCard;
