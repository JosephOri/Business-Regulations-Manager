import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ReportPage } from "./components/ReportPage";
import ComplianceForm from "./components/compliance-form-components/ComplianceForm";

function AppContent() {
  const [report, setReport] = useState<string>("");
  const navigate = useNavigate();

  const handleReportGenerated = (reportText: string) => {
    setReport(reportText);
    navigate("/report"); // נווט לעמוד הדוח לאחר קבלת התשובה
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<ComplianceForm onReportGenerated={handleReportGenerated} />} />
        <Route path="/report" element={<ReportPage reportContent={report} />} />
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
