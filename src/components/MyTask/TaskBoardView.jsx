import React from "react";
import { STATUS } from "@/constants/status";
import DraggableTaskCard from "./DraggableTaskCard";
import { useTranslation } from "react-i18next";

const TaskBoardView = ({
  filteredTasks,
  dragOverColumn,
  dragAndDropProps,
  cardProps,
  onReorderTasks,
}) => {
  const { t } = useTranslation();
  const { handleDragOver, handleDrop } = dragAndDropProps;

  const tasksByStatus = {
    [STATUS.TODO]: filteredTasks.filter((task) => task.status === STATUS.TODO),
    [STATUS.IN_PROGRESS]: filteredTasks.filter(
      (task) => task.status === STATUS.IN_PROGRESS
    ),
    [STATUS.COMPLETED]: filteredTasks.filter(
      (task) => task.status === STATUS.COMPLETED
    ),
  };

  const handleColumnDrop = (e, dropStatus) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData("text/plain");
    const dropTargetId = e.target.closest("[data-task-id]")?.dataset.taskId;

    if (!draggedTaskId) return;

    const draggedTask = filteredTasks.find((t) => t.id === draggedTaskId);
    if (!draggedTask) return;

    if (dropTargetId && draggedTask.status === dropStatus) {
      onReorderTasks(draggedTaskId, dropTargetId, dropStatus);
    } else {
      handleDrop(e, dropStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      {Object.entries(tasksByStatus).map(([status, tasks]) => (
        <div
          key={status}
          className={`bg-white dark:bg-gray-400 p-4 rounded-lg ${
            dragOverColumn === status ? "bg-gray-100" : ""
          }`}
          onDragOver={(e) => handleDragOver(e, status)}
          onDrop={(e) => handleColumnDrop(e, status)}
          data-column={status}
        >
          <h3 className="font-semibold mb-4">{t(status)}</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} data-task-id={task.id}>
                <DraggableTaskCard task={task} {...cardProps} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoardView;
