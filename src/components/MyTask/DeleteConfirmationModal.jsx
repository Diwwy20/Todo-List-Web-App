import React from "react";

const DeleteConfirmationModal = ({
  deleteConfirmationTask,
  setDeleteConfirmationTask,
  deleteTask,
}) => {
  if (!deleteConfirmationTask) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Delete Task</h3>
        <p className="mb-6">คุณต้องการยืนยันที่จะลบงานนี้ใช่หรือไม่?</p>
        <p className="mb-4 font-medium text-gray-700">
          "{deleteConfirmationTask.title}"
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDeleteConfirmationTask(null)}
            className="border rounded-md px-4 py-2"
          >
            ยกเลิก
          </button>
          <button
            onClick={deleteTask}
            className="bg-red-500 text-white rounded-md px-4 py-2"
          >
            ยืนยันการลบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
