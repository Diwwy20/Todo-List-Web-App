import { useState, useEffect } from "react";
import { isToday, isBefore, format } from "date-fns";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TaskListView from "./TaskListView";
import TaskBoardView from "./TaskBoardView";

import { STATUS } from "@/constants/status";
import { formatDate, formatDateString, parseDate } from "@/utils/dateUtils";
import CustomDateInput from "./CustomDateInput";
import TaskAlertDialog from "../TaskForm/TaskAlertDialog";
import EditTaskForm from "../TaskForm/EditTaskForm";
import DeleteTaskForm from "../TaskForm/DeleteTaskForm";

export default function MyTask() {
  const { t } = useTranslation();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [displayMode, setDisplayMode] = useState("List");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All tasks");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmationTask, setDeleteConfirmationTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    status: STATUS.TODO,
    dueDate: formatDateString(new Date()),
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const today = new Date();

    const updatedTasks = tasks.map((task) => {
      if (task.completed) {
        return task;
      }

      const dueDate = parseDate(task.dueDate);

      if (isToday(dueDate)) {
        return { ...task, dueDateStatus: STATUS.DUE_TODAY };
      }

      if (isBefore(dueDate, today)) {
        return { ...task, dueDateStatus: STATUS.OVERDUE };
      }

      return { ...task, dueDateStatus: "" };
    });

    if (JSON.stringify(updatedTasks) !== JSON.stringify(tasks)) {
      setTasks(updatedTasks);
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.title.trim() === "") {
      toast.error(t("Please_Fill_Task_Name"));
      return;
    }

    const taskToAdd = {
      id: Date.now().toString(),
      title: newTask.title,
      status: newTask.status,
      dueDate: newTask.dueDate,
      completed: false,
      dueDateStatus: "",
    };

    setTasks([taskToAdd, ...tasks]);
    setIsAddModalOpen(false);
    setNewTask({
      title: "",
      status: STATUS.TODO,
      dueDate: formatDate(new Date()),
    });
    toast.success(t("Add_Success"));
  };

  const confirmDeleteTask = (task) => {
    setDeleteConfirmationTask(task);
  };

  const deleteTask = () => {
    if (!deleteConfirmationTask) return;

    setTasks(tasks.filter((task) => task.id !== deleteConfirmationTask.id));
    setDeleteConfirmationTask(null);
    toast.success(t("Delete_Success"));
  };

  const handleCloseAlertDialog = () => {
    setIsAlertDialogOpen(false);
    setNewTask({
      title: "",
      status: STATUS.TODO,
      dueDate: formatDate(new Date()),
    });
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newCompleted = !task.completed;
          return {
            ...task,
            completed: newCompleted,
            status: newCompleted
              ? STATUS.COMPLETED
              : task.status === STATUS.COMPLETED
              ? STATUS.TODO
              : task.status,
          };
        }
        return task;
      })
    );
  };

  const updateTask = () => {
    if (!editingTask || editingTask.title.trim() === "") {
      toast.error(t("please_fill_all_fields"));
      return;
    }

    const originalTask = tasks.find((task) => task.id === editingTask.id);

    if (
      originalTask &&
      JSON.stringify(originalTask) === JSON.stringify(editingTask)
    ) {
      setEditingTask(null);
      return;
    }

    const updatedTask = {
      ...editingTask,
      completed: editingTask.status === STATUS.COMPLETED,
    };

    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? updatedTask : task))
    );

    setEditingTask(null);
    toast.success(t("edit_success"));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newCompleted = newStatus === STATUS.COMPLETED;
          return {
            ...task,
            status: newStatus,
            completed: newCompleted,
          };
        }
        return task;
      })
    );
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";

    setTimeout(() => {
      setDraggedTask(task);
    }, 0);

    e.target.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    setDraggedTask(null);
    setDragOverColumn(null);
    e.target.classList.remove("dragging");
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    setDragOverColumn(status);

    e.stopPropagation();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();

    if (draggedTask) {
      updateTaskStatus(draggedTask.id, status);
      setDraggedTask(null);
      setDragOverColumn(null);
    }

    e.stopPropagation();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedDate) {
      const taskDate = parseDate(task.dueDate);
      if (
        taskDate.getMonth() !== selectedDate.getMonth() ||
        taskDate.getFullYear() !== selectedDate.getFullYear()
      ) {
        return false;
      }
    }

    if (filter === "All") return true;
    if (filter === STATUS.COMPLETED) return task.completed;
    if (filter === STATUS.TODO)
      return !task.completed && task.status === STATUS.TODO;
    if (filter === STATUS.IN_PROGRESS)
      return !task.completed && task.status === STATUS.IN_PROGRESS;

    return true;
  });

  const todayTasks = filteredTasks.filter(
    (task) =>
      task.dueDateStatus === STATUS.DUE_TODAY ||
      (!task.dueDateStatus && !task.completed)
  );

  const overdueTasks = filteredTasks.filter(
    (task) => task.dueDateStatus === STATUS.OVERDUE && !task.completed
  );

  const handleReorderTasks = (draggedId, dropTargetId, status) => {
    const newTasks = [...tasks];
    const draggedTaskIndex = newTasks.findIndex((t) => t.id === draggedId);
    const dropTargetIndex = newTasks.findIndex((t) => t.id === dropTargetId);

    if (draggedTaskIndex !== -1 && dropTargetIndex !== -1) {
      const [draggedTask] = newTasks.splice(draggedTaskIndex, 1);
      newTasks.splice(dropTargetIndex, 0, draggedTask);
      setTasks(newTasks);
    }
  };
  const taskItemProps = {
    toggleComplete,
    updateTaskStatus,
    setEditingTask,
    confirmDeleteTask,
  };

  const dragAndDropProps = {
    handleDragOver,
    handleDrop,
  };

  const cardProps = {
    draggedTask,
    handleDragStart,
    handleDragEnd,
    setEditingTask,
    confirmDeleteTask,
  };

  return (
    <div className="flex-1 p-6 lg:ml-0 dark:bg-gray-300 dark:min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-8">
        <div>
          <h2 className="text-gray-500 dark:text-black text-2xl md:text-3xl font-bold">
            👋 {t("My_Task")}
          </h2>
          <p className="mt-1 text-gray-500 dark:text-black">
            {t("Manage_Tasks")}
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <button
              className={`px-4 py-2 cursor-pointer ${
                displayMode === "List"
                  ? "bg-[#FF6574] text-white"
                  : "bg-white dark:bg-gray-400"
              }`}
              onClick={() => setDisplayMode("List")}
            >
              {t("List")}
            </button>
            <button
              className={`px-4 py-2 cursor-pointer ${
                displayMode === "Board"
                  ? "bg-[#FF6574] text-white"
                  : "bg-white dark:bg-gray-400"
              }`}
              onClick={() => setDisplayMode("Board")}
            >
              {t("Board")}
            </button>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md px-3 py-2 cursor-pointer dark:bg-gray-400"
          >
            <option value="All">{t("All_Tasks")}</option>
            <option value={STATUS.TODO}>{t("To_Do")}</option>
            <option value={STATUS.IN_PROGRESS}>{t("In_Progress")}</option>
            <option value={STATUS.COMPLETED}>{t("Completed")}</option>
          </select>

          <button
            onClick={() => setIsAlertDialogOpen(true)}
            className="bg-[#FF6574] text-white rounded-md px-4 py-2 flex items-center gap-1 cursor-pointer hover:bg-[#FF6574]/70"
          >
            <span>+</span> {t("Add_New")}
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        {/* Search task form */}
        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-400">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t("Search_Task")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:text-black dark:bg-gray-100"
            />
            <button className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer">
              {t("Search")}
            </button>
          </div>
        </div>

        {/* Date Filter */}
        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 dark:text-white">
                {t("Filter_Month_Year")}
              </span>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                placeholderText="Select Month/Year"
                customInput={<CustomDateInput />}
                isClearable
              />
            </div>
            {selectedDate && (
              <div className="text-sm text-gray-600">
                {t("Showing_Task_For")}: {format(selectedDate, "MMMM yyyy")}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dragging {
          cursor: grabbing !important;
        }
      `}</style>

      {displayMode === "List" ? (
        <TaskListView
          todayTasks={todayTasks}
          overdueTasks={overdueTasks}
          taskItemProps={taskItemProps}
        />
      ) : (
        <TaskBoardView
          filteredTasks={filteredTasks}
          dragOverColumn={dragOverColumn}
          dragAndDropProps={dragAndDropProps}
          cardProps={cardProps}
          onReorderTasks={handleReorderTasks}
        />
      )}

      <TaskAlertDialog
        isAlertDialogOpen={isAlertDialogOpen}
        setIsAlertDialogOpen={setIsAlertDialogOpen}
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        handleCloseAlertDialog={handleCloseAlertDialog}
      />

      <EditTaskForm
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        updateTask={updateTask}
      />

      <DeleteTaskForm
        deleteConfirmationTask={deleteConfirmationTask}
        setDeleteConfirmationTask={setDeleteConfirmationTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}
