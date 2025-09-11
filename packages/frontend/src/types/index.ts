export type CustomField = {
  id: string;
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
