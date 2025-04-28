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
} from "@/components/ui/alert-dialog";
import AddTaskForm from "./AddTaskForm";
import { SubmitButton } from "../Form/Button";
import { useTranslation } from "react-i18next";

export default function EditTaskForm({
  editingTask,
  setEditingTask,
  updateTask,
}) {
  const { t } = useTranslation();
  return (
    <AlertDialog
      open={!!editingTask}
      onOpenChange={(open) => !open && setEditingTask(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Edit_Task")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("Update_Selected_Task")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {editingTask && (
          <AddTaskForm
            newTask={editingTask}
            setNewTask={setEditingTask}
            addTask={() => {}}
          />
        )}

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <SubmitButton
              text={t("Cancel")}
              className="bg-red-400 hover:bg-red-600 dark:text-white font-bold"
              onClick={() => setEditingTask(null)}
            />
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <SubmitButton
              text={t("Save_Changes")}
              className="bg-green-400 hover:bg-green-600 dark:text-white font-bold"
              onClick={() => {
                updateTask();
              }}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
