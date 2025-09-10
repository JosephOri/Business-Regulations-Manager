import axios from "axios";
import { ComplianceDataPayload, ComplianceResponse } from "../types";

const API_BASE_URL = "http://localhost:3001/api";

export const submitComplianceCheck = async (
  data: ComplianceDataPayload,
): Promise<string> => {
  try {
    const response = await axios.post<ComplianceResponse>(
      `${API_BASE_URL}/compliance/check`,
      data,
    );
    return response.data.report;
  } catch (error) {
    console.error("Error submitting compliance check:", error);
    throw new Error("Failed to generate report from server.");
  }
};
