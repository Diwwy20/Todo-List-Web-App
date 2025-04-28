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
import { SubmitButton } from "../Form/Button";
import { useTranslation } from "react-i18next";

export default function DeleteTaskForm({
  deleteConfirmationTask,
  setDeleteConfirmationTask,
  deleteTask,
}) {
  const { t } = useTranslation();
  return (
    <AlertDialog
      open={!!deleteConfirmationTask}
      onOpenChange={(open) => !open && setDeleteConfirmationTask(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("Delete_Task")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("Delete_Confirmation")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <SubmitButton
              text={t("Cancel")}
              className="bg-gray-400 hover:bg-gray-600 dark:text-white font-bold"
              onClick={() => setDeleteConfirmationTask(null)}
            />
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <SubmitButton
              text={t("Delete")}
              className="bg-red-500 hover:bg-red-700 dark:text-white font-bold"
              onClick={() => {
                deleteTask();
              }}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
