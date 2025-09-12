export interface ComplianceRequestBody {
  businessSize: number;
  seatingCapacity: number;
  customFields: Record<string, string | number>;
}

export interface BusinessData {
  businessSize: number;
  seatingCapacity: number;
  customFields: Record<string, string | number | boolean>;
}

export interface GeneratedReportParams {
  businessData: BusinessData;
  regulationsContext: string;
}

export interface VectorRecord {
  content: string;
  embedding: number[];
}
