export type TFineTuneStatus =
  | "validating_files"
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled"
  | "";
