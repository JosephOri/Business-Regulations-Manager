import React from "react";
import { useComplianceCheck } from "../../hooks/useComplianceCheck";
import { useComplianceFormStore } from "../../store/complianceFormStore";
import FormHeader from "./FormHeader";
import StaticFields from "./StaticFields";
import DynamicFieldList from "./DynamicFieldList";
import SubmitButton from "./SubmitButton";

const ComplianceForm = () => {
  const { getPayload, setReportText } = useComplianceFormStore();
  const { mutate, isPending } = useComplianceCheck();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = getPayload();

    if (Object.keys(payload.customFields).length === 0) {
      alert("חובה למלא לפחות מאפיין נוסף אחד (כולל שם המאפיין).");
      return;
    }

    mutate(payload, {
      onSuccess: (reportText) => {
        setReportText(reportText);
      },
      onError: (error) => {
        console.error("Failed to get report", error);
        alert("אירעה שגיאה בעת הפקת הדוח. נסה שוב מאוחר יותר.");
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded-xl bg-white px-8 pt-6 pb-8 shadow-2xl"
      >
        <FormHeader
          title="בדיקת תאימות רגולטורית"
          subtitle="הזן את נתוני העסק כדי לקבל דוח מותאם אישית"
        />
        <StaticFields />
        <DynamicFieldList />
        <SubmitButton isLoading={isPending} />
      </form>
    </div>
  );
};

export default ComplianceForm;
