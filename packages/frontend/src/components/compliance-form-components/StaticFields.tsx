import { useComplianceFormStore } from "../../store/complianceFormStore";

const StaticFields = () => {
  const { businessSize, seatingCapacity, setBusinessSize, setSeatingCapacity } =
    useComplianceFormStore();

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <label
          htmlFor="size"
          className="mb-2 block text-right text-sm font-bold text-gray-700"
        >
          גודל העסק (מ"ר)
        </label>
        <input
          type="number"
          id="size"
          value={businessSize}
          onChange={(e) => setBusinessSize(Number(e.target.value))}
          className="rtl w-full appearance-none rounded border px-4 py-3 text-right leading-tight text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <label
          htmlFor="seating"
          className="mb-2 block text-right text-sm font-bold text-gray-700"
        >
          מספר מקומות ישיבה
        </label>
        <input
          type="number"
          id="seating"
          value={seatingCapacity}
          onChange={(e) => setSeatingCapacity(Number(e.target.value))}
          className="w-full appearance-none rounded border px-4 py-3 text-right leading-tight text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
    </div>
  );
};

export default StaticFields;
