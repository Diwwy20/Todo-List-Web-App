import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SummaryPage from "./pages/SummaryPage";
import MyTaskPage from "./pages/MyTaskPage";
import MainLayout from "./layout/MainLayout";
import "./locales";

function App() {
  const location = useLocation();
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/summary" />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/my-task" element={<MyTaskPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace state={{ from: location }} />}
      />
    </Routes>
  );
}

export default App;
