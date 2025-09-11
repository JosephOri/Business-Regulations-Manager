import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ReportPage from "./components/ReportPage";
import ComplianceForm from "./components/compliance-form-components/ComplianceForm";
import { useComplianceFormStore } from "./store/complianceFormStore";
import { useEffect } from "react";

function AppContent() {
  const navigate = useNavigate();
  const reportText = useComplianceFormStore((state) => state.reportText);
  const resetForm = useComplianceFormStore((state) => state.resetForm);

  useEffect(() => {
    if (reportText) {
      navigate("/report");
    } else {
      resetForm();
    }
  }, [reportText, navigate, resetForm]);

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
