import React, { useState } from "react";
import { submitComplianceCheck } from "../../services/api";
import type { CustomField, ComplianceDataPayload } from "../../types";
import FormHeader from "./FormHeader";
import StaticFields from "./StaticFields";
import DynamicFieldList from "./DynamicFieldList";
import SubmitButton from "./SubmitButton";

type Props = {
  onReportGenerated: (reportText: string) => void;
};

const ComplianceForm = ({ onReportGenerated }: Props) => {
  const [businessSize, setBusinessSize] = useState<number>(50);
  const [seatingCapacity, setSeatingCapacity] = useState<number>(20);
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: Date.now(), key: "", value: "" },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddField = () => {
    setCustomFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), key: "", value: "" },
    ]);
  };

  const handleFieldChange = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    setCustomFields((prevFields) =>
      prevFields.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    );
  };

  const handleRemoveField = (index: number) => {
    if (customFields.length > 1) {
      setCustomFields((prevFields) => prevFields.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const customFieldsObject = customFields.reduce(
      (acc, field) => {
        if (field.key.trim()) {
          acc[field.key.trim()] = field.value.trim();
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    if (Object.keys(customFieldsObject).length === 0) {
      alert("חובה למלא לפחות מאפיין נוסף אחד (כולל שם המאפיין).");
      return;
    }

    setIsLoading(true);

    const payload: ComplianceDataPayload = {
      businessSize,
      seatingCapacity,
      customFields: customFieldsObject,
    };

    try {
      const reportText = await submitComplianceCheck(payload);
      onReportGenerated(reportText);
    } catch (error) {
      console.error("Failed to get report", error);
      alert("אירעה שגיאה בעת הפקת הדוח. נסה שוב מאוחר יותר.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded-xl bg-white px-8 pt-6 pb-8 shadow-2xl"
      >
        <FormHeader
          title="בדיקת תאימות רגולטורית"
          subtitle="הזן את נתוני העסק כדי לקבל דוח מותאם אישית"
        />
        <StaticFields
          businessSize={businessSize}
          seatingCapacity={seatingCapacity}
          onSizeChange={setBusinessSize}
          onSeatingChange={setSeatingCapacity}
        />
        <DynamicFieldList
          fields={customFields}
          onFieldChange={handleFieldChange}
          onRemoveField={handleRemoveField}
          onAddField={handleAddField}
        />
        <SubmitButton isLoading={isLoading} />
      </form>
    </div>
  );
};

export default ComplianceForm;
