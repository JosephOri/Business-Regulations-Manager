import type { CustomField } from "../../types";

type Props = {
  field: CustomField;
  index: number;
  canBeRemoved: boolean;
  onFieldChange: (index: number, field: "key" | "value", value: string) => void;
  onRemoveField: (index: number) => void;
};

const DynamicField = ({
  field,
  index,
  canBeRemoved,
  onFieldChange,
  onRemoveField,
}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="שם המאפיין (לדוגמה: הגשת בשר)"
        value={field.key}
        onChange={(e) => onFieldChange(index, "key", e.target.value)}
        className="flex-1 rounded border px-3 py-2 text-right text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        type="text"
        placeholder="ערך (לדוגמה: העסק מגיש בשר עם כשרות בדץ)"
        value={field.value}
        onChange={(e) => onFieldChange(index, "value", e.target.value)}
        className="flex-1 rounded border px-3 py-2 text-right text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {canBeRemoved ? (
        <button
          type="button"
          onClick={() => onRemoveField(index)}
          className="flex-shrink-0 rounded-full bg-red-500 p-2 font-bold text-white transition-opacity duration-200 hover:bg-red-700"
          aria-label="Remove field"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 12H6"
            />
          </svg>
        </button>
      ) : (
        // Add a placeholder to keep the layout consistent
        <div className="h-8 w-8 flex-shrink-0" />
      )}
    </div>
  );
};

export default DynamicField;
