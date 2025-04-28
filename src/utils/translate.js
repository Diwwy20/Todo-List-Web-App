import { STATUS } from "@/constants/status";

export const translateStatus = (status, t) => {
  switch (status) {
    case STATUS.TODO:
      return t("status.todo");
    case STATUS.IN_PROGRESS:
      return t("status.in_progress");
    case STATUS.COMPLETED:
      return t("status.completed");
    default:
      return status;
  }
};

export const translateDueDateStatus = (dueDateStatus, t) => {
  switch (dueDateStatus) {
    case STATUS.OVERDUE:
      return t("status.overdue");
    case STATUS.DUE_TODAY:
      return t("status.due_today");
    default:
      return dueDateStatus;
  }
};