export type CustomField = {
  id: number;
  key: string;
  value: string;
};

export type ComplianceDataPayload = {
  businessSize: number;
  seatingCapacity: number;
  customFields: Record<string, string>;
};

export interface ComplianceResponse {
  report: string;
}
