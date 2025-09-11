import DynamicField from "./DynamicField";
import { useComplianceFormStore } from "../../store/complianceFormStore";

const DynamicFieldList = () => {
  const { customFields, addField, updateField, removeField } =
    useComplianceFormStore();
  const canRemoveFields = customFields.length > 1;

  return (
    <div className="mb-4">
      <h3 className="mb-3 text-right text-lg font-semibold text-gray-700">
        מאפיינים נוספים (חובה למלא לפחות אחד)
      </h3>
      <div className="space-y-3">
        {customFields.map((field, index) => (
          <DynamicField
            key={field.id}
            field={field}
            index={index}
            onFieldChange={updateField}
            onRemoveField={removeField}
            canBeRemoved={canRemoveFields}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={addField}
        className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        הוסף מאפיין נוסף +
      </button>
    </div>
  );
};

export default DynamicFieldList;
