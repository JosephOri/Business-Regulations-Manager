import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReportPage from "./components/ReportPage";
import ComplianceForm from "./components/compliance-form-components/ComplianceForm";
import { useComplianceFormStore } from "./store/complianceFormStore";

function AppContent() {
  const reportText = useComplianceFormStore((state) => state.reportText);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Routes>
        <Route path="/" element={<ComplianceForm />} />
        <Route
          path="/report"
          element={<ReportPage reportContent={reportText} />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
