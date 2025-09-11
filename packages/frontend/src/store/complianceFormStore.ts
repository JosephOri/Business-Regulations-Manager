import { create } from "zustand";
import { CustomField, ComplianceDataPayload } from "../types";
import { v4 as uuidv4 } from "uuid";

interface ComplianceFormState {
  businessSize: number;
  seatingCapacity: number;
  customFields: CustomField[];
  reportText: string;
  setBusinessSize: (size: number) => void;
  setSeatingCapacity: (capacity: number) => void;
  setCustomFields: (fields: CustomField[]) => void;
  addField: () => void;
  updateField: (index: number, field: "key" | "value", value: string) => void;
  removeField: (index: number) => void;
  setReportText: (report: string) => void;
  getPayload: () => ComplianceDataPayload;
  resetForm: () => void;
}

export const useComplianceFormStore = create<ComplianceFormState>(
  (set, get) => ({
    businessSize: 50,
    seatingCapacity: 20,
    customFields: [{ id: uuidv4(), key: "", value: "" }],
    reportText: "",
    setBusinessSize: (size) => set({ businessSize: size }),
    setSeatingCapacity: (capacity) => set({ seatingCapacity: capacity }),
    setCustomFields: (fields) => set({ customFields: fields }),
    addField: () =>
      set((state) => ({
        customFields: [
          ...state.customFields,
          { id: uuidv4(), key: "", value: "" },
        ],
      })),
    updateField: (index, field, value) =>
      set((state) => ({
        customFields: state.customFields.map((f, i) =>
          i === index ? { ...f, [field]: value } : f,
        ),
      })),
    removeField: (index) =>
      set((state) => ({
        customFields: state.customFields.filter((_, i) => i !== index),
      })),
    setReportText: (report) => set({ reportText: report }),
    getPayload: () => {
      const state = get();
      const customFieldsObject = state.customFields.reduce(
        (acc, field) => {
          if (field.key.trim()) {
            acc[field.key.trim()] = field.value.trim();
          }
          return acc;
        },
        {} as Record<string, string>,
      );

      return {
        businessSize: state.businessSize,
        seatingCapacity: state.seatingCapacity,
        customFields: customFieldsObject,
      };
    },
    resetForm: () =>
      set({
        businessSize: 50,
        seatingCapacity: 20,
        customFields: [{ id: uuidv4(), key: "", value: "" }],
        reportText: "",
      }),
  }),
);
