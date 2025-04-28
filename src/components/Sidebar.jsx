import images from "@/constants/images";
import { Link, useLocation } from "react-router-dom";
import { useTaskContext } from "@/context/TaskContext";
import Language from "@/components/Language"; // <== import Language เข้ามา
import { DarkMode } from "@/components/DarkMode"; // <== import DarkMode เข้ามา
import { useTranslation } from "react-i18next";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { refreshTasks } = useTaskContext();
  const { t } = useTranslation();

  const isActive = (path) => location.pathname === path;

  const handleNavigate = () => {
    refreshTasks();
    onClose();
  };

  return (
    <>
      {/* ----- Mobile overlay ----- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ----- Sidebar content ----- */}
      <div
        className={`dark:bg-gray-500 flex flex-col justify-between w-64 h-full bg-white border-r p-4 fixed top-0 left-0 z-50 transition-all duration-300 transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:w-16 md:z-30
    lg:w-64 lg:static lg:translate-x-0`}
      >
        {/* ส่วนบน: Logo */}
        <div>
          <div className="flex justify-center mb-6 mt-6 md:mt-2 lg:mt-0">
            <img
              src={images.logo}
              className="w-16 h-16 md:w-10 md:h-10 lg:w-32 lg:h-32 rounded-full"
              alt="logo"
            />
          </div>

          {/* ----- เมนู ----- */}
          <nav className="flex flex-col gap-4 mt-4">
            <p className="text-gray-400 hidden md:block lg:hidden text-xs text-center mb-2 dark:text-white">
              {t("Menu_List")}
            </p>
            <p className="text-gray-400 hidden lg:block mb-2 dark:text-white">
              {t("Menu_List")}
            </p>

            <Link
              to="/summary"
              className={`relative text-base md:text-xs lg:text-lg p-3 md:p-2 lg:p-3 transition-all flex items-center
    ${
      isActive("/summary")
        ? "bg-[#D5D4F5] font-bold rounded-r-full before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pink-300"
        : "hover:bg-gray-200 hover:rounded-r-full dark:hover:bg-gray-700"
    }`}
              onClick={handleNavigate}
            >
              <span className="mr-2 md:mr-0 lg:mr-2">🎯</span>
              <span className="md:hidden lg:inline">{t("Summary")}</span>
            </Link>

            <Link
              to="/my-task"
              className={`relative text-base md:text-xs lg:text-lg p-3 md:p-2 lg:p-3 transition-all flex items-center
    ${
      isActive("/my-task")
        ? "bg-[#D5D4F5] font-bold rounded-r-full before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pink-300"
        : "hover:bg-gray-200 hover:rounded-r-full dark:hover:bg-gray-700"
    }`}
              onClick={handleNavigate}
            >
              <span className="mr-2 md:mr-0 lg:mr-2">👋</span>
              <span className="md:hidden lg:inline">{t("My_Task")}</span>
            </Link>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 mt-4 lg:flex-row">
          <Language />
          <DarkMode />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
