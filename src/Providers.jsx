import { Toaster } from "react-hot-toast";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }) => {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <TaskProvider>
        {children}
        <Toaster />
      </TaskProvider>
    </ThemeProvider>
  );
};

export default Providers;
