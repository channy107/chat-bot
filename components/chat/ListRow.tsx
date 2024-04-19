import OpenAI from "openai";

import { Badge } from "@components/ui/badge";
import { formatDate } from "@lib/date";
import { capitalize } from "@lib/string";

type Props = {
  fineTune: OpenAI.FineTuning.Jobs.FineTuningJob;
};

export function ListRow({ fineTune }: Props) {
  const { fine_tuned_model, model, status, created_at } = fineTune;
  return (
    <li className="flex justify-between gap-4 border-b border-slate-200 p-4">
      <div className="flex items-center gap-2 text-sm md:text-base">
        {fine_tuned_model || model}
        {status !== "succeeded" && (
          <Badge variant={status === "failed" ? "destructive" : "secondary"}>
            {capitalize(status.replace("_", " "))}
          </Badge>
        )}
      </div>
      <div className="hidden md:block">{formatDate(created_at)}</div>
    </li>
  );
}
