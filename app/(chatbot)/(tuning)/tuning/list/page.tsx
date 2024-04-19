"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";

import { ListRow } from "@components/chat/ListRow";
import { FineTuningModal } from "@components/modals/modal/FineTuningModal";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";
import { Button } from "@components/ui/button";

import { useGetFineTunes } from "@queries/useGetFineTunes";
import { capitalize } from "@lib/string";
import { useModalStore } from "@stores/modal";
import { TFineTuneStatus } from "@/types/openai";

type TFilter = { label: string; value?: TFineTuneStatus };

export default function TuningListPage() {
  const [filter, setFilter] = useState<TFilter>({
    label: "",
    value: undefined,
  });
  const { openModal } = useModalStore();

  const { data, isFetching, isRefetching, fetchNextPage, hasNextPage } =
    useGetFineTunes({
      filter: filter.value,
      useInterval: true,
    });

  const isLoading = isFetching && !isRefetching;
  const showMoreButton = hasNextPage && !isLoading;

  const fineTunes = useMemo(() => data?.pages.flatMap((item) => item), [data]);

  const openFineTuningModal = () => {
    openModal({
      content: <FineTuningModal />,
      title: "튜닝 모델 만들기",
      description: "jsonl 파일 형식의 데이터를 드래그 또는 업로드 해주세요.",
    });
  };

  const loadMore = () => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  };

  const onValueChange = (value: TFineTuneStatus) => {
    const newFilter = {
      label: capitalize(value),
      value,
    };
    setFilter(newFilter);
  };
  return (
    <div className="mt-[40px] md:mt-[80px]">
      <div className="flex justify-between px-2">
        <ToggleGroup
          variant="outline"
          value={filter.label}
          onValueChange={onValueChange}
          type="single"
          className="flex justify-start mb-4"
        >
          <ToggleGroupItem value="" aria-label="Toggle All">
            ALL
          </ToggleGroupItem>
          <ToggleGroupItem value="succeeded" aria-label="Toggle Success">
            Success
          </ToggleGroupItem>
          <ToggleGroupItem value="failed" aria-label="Toggle Failed">
            Failed
          </ToggleGroupItem>
        </ToggleGroup>
        <Button onClick={openFineTuningModal}>
          <Plus className="mr-2" />
          만들기
        </Button>
      </div>
      <ul className="pb-4">
        {fineTunes?.map((fineTune) => (
          <ListRow key={fineTune.id} fineTune={fineTune} />
        ))}
      </ul>
      {isLoading && (
        <div className="flex justify-center">
          <ClipLoader size={20} />
        </div>
      )}

      {showMoreButton && (
        <div
          onClick={loadMore}
          className="flex items-center justify-center gap-2 p-2 hover:bg-slate-100 cursor-pointer rounded-sm text-slate-500"
        >
          <ChevronDown />
          더보기
        </div>
      )}
    </div>
  );
}
