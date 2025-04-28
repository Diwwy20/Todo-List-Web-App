import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const CustomDateInput = forwardRef(({ value, onClick }, ref) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={onClick}
      ref={ref}
      className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 cursor-pointer bg-white min-w-[220px] transition-all hover:border-[#FF6574] hover:bg-gray-50"
    >
      <CalendarIcon className="w-4 h-4 text-gray-500" />
      <span className={value ? "text-black" : "text-gray-400"}>
        {value || t("Select_Month_Year")}
      </span>
    </div>
  );
});

export default CustomDateInput;
