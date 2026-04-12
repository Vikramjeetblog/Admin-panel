import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Brands from "./pages/BrandsOverview"; 
import TCS from "./pages/TCS";
import TCMI from "./pages/TCMI";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="brands" element={<Brands />} /> 

      <Route path="brands/tcs" element={<TCS />} />
      <Route path="brands/tcmi" element={<TCMI />} />
      </Route>
    </Routes>
  );
}

export default App;