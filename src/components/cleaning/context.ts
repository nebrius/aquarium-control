import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

import { type CleaningRecordEntry } from "@/types/lights.ts";

type CleaningContextValue = {
  cleaningRecords: CleaningRecordEntry[];
  setCleaningRecords: Dispatch<SetStateAction<CleaningRecordEntry[]>>;
};

export const CleaningContext = createContext<CleaningContextValue | undefined>(
  undefined,
);

export function useCleaningContext() {
  const ctx = useContext(CleaningContext);
  if (!ctx) {
    throw new Error("useCleaningContext must be used within a CleaningPage");
  }
  return ctx;
}
