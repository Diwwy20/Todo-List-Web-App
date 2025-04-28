import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SubmitButton = ({
  className = "",
  size = "default",
  text = "",
  isLoading = false,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      type={onClick ? "button" : "submit"}
      size={size}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={`${className} capitalize cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 ${
        isLoading ? "pointer-events-none" : ""
      }`}
    >
      {isLoading && <Loader2 className="animate-spin w-5 h-5" />}
      {text}
    </Button>
  );
};
