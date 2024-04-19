import OpenAI from "openai";
import {
  InfiniteData,
  QueryKey,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { getFineTuningList } from "@actions/openai";
import { TFineTuneStatus } from "@/types/openai";

type Params = {
  limit?: number;
  filter?: TFineTuneStatus;
  useInterval?: boolean;
};

export function useGetFineTunes({
  limit = 10,
  filter,
  useInterval = false,
}: Params) {
  const fetcher = async ({ pageParam }: { pageParam?: string }) => {
    const fineTunes = await getFineTuningList({
      limit,
      after: pageParam,
      filter,
    });

    return fineTunes;
  };

  return useInfiniteQuery<
    OpenAI.FineTuning.Jobs.FineTuningJob[],
    Error,
    InfiniteData<OpenAI.FineTuning.Jobs.FineTuningJob[]>,
    QueryKey,
    string | undefined
  >({
    queryKey: ["fineTunes", limit, filter],
    queryFn: fetcher,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.length < 10 ? undefined : lastPage.at(-1)?.id;
    },
    placeholderData: keepPreviousData,
    refetchInterval: useInterval ? 6000 : false,
  });
}
