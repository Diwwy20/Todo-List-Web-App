import React, { createContext, useContext, useState, useEffect } from "react";
import { isToday, isBefore } from "date-fns";
import { STATUS } from "@/constants/status";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const refreshTasks = () => {
    const savedTasks = localStorage.getItem("myTasks");
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  };

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

  const formatDateString = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = parseDate(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        refreshTasks,
        formatDateString,
        formatDisplayDate,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const parseDate = (dateString) => {
  if (!dateString) return new Date();
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
