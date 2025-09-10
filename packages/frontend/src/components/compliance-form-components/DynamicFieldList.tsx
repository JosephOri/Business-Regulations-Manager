import type { CustomField } from "../../types";
import DynamicField from "./DynamicField";

type Props = {
  fields: CustomField[];
  onFieldChange: (index: number, field: "key" | "value", value: string) => void;
  onRemoveField: (index: number) => void;
  onAddField: () => void;
};

const DynamicFieldList = ({
  fields,
  onFieldChange,
  onRemoveField,
  onAddField,
}: Props) => {
  const canRemoveFields = fields.length > 1;

  return (
    <div className="mb-4">
      <h3 className="mb-3 text-right text-lg font-semibold text-gray-700">
        מאפיינים נוספים (חובה למלא לפחות אחד)
      </h3>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <DynamicField
            key={field.id}
            field={field}
            index={index}
            onFieldChange={onFieldChange}
            onRemoveField={onRemoveField}
            canBeRemoved={canRemoveFields}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onAddField}
        className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        הוסף מאפיין נוסף +
      </button>
    </div>
  );
};

export default DynamicFieldList;
