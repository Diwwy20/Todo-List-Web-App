import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddTaskForm from "./AddTaskForm";
import { SubmitButton } from "../Form/Button";
import { useTranslation } from "react-i18next";

export default function TaskAlertDialog({
  isAlertDialogOpen,
  setIsAlertDialogOpen,
  newTask,
  setNewTask,
  addTask,
  handleCloseAlertDialog,
}) {
  const { t } = useTranslation();
  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Add_Your_Task")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("Please_Fill_Task_Info")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <SubmitButton
              text={t("Cancel")}
              className="bg-red-400 hover:bg-red-600 dark:text-white font-bold"
              onClick={() => handleCloseAlertDialog(false)}
            />
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <SubmitButton
              text={t("Add_Task")}
              className="bg-green-400 hover:bg-green-600 dark:text-white font-bold"
              onClick={() => {
                addTask();
                handleCloseAlertDialog(false);
              }}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
