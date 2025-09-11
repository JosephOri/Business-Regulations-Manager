import { useMutation } from "@tanstack/react-query";
import { submitComplianceCheck } from "../services/api";
import { ComplianceDataPayload } from "../types";

export const useComplianceCheck = () => {
  return useMutation<string, Error, ComplianceDataPayload>({
    mutationFn: submitComplianceCheck,
  });
};
