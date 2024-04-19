"use client";

import { useState } from "react";
import { Check, ChevronDown, PlusCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@components/ui/command";
import { Button } from "@components/ui/button";

import { useModelStore } from "@stores/model";
import { cn } from "@lib/utils";

export function ModelSelect() {
  const [open, setOpen] = useState(false);
  const { model, updateModel } = useModelStore((state) => ({
    model: state.model,
    updateModel: state.updateModel,
  }));

  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const qsModel = searchParams.get("model");
  const currentModel = qsModel || model;

  const onServiceSelect = (selectedModel: string) => {
    setOpen(false);
    updateModel(selectedModel);
    router.replace(`${pathname}/?model=${selectedModel}`);
  };

  return (
    <div className="w-full sticky top-0 mb-1 z-10 h-14 p-2 bg-white flex justify-start">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            aria-expanded={open}
            aria-label={"모델을 선택해주세요."}
            className={"w-[250px] text-2xl justify-between border-none"}
          >
            <div className="overflow-hidden whitespace-nowrap text-ellipsis break-words">
              {currentModel}
            </div>
            <div>
              <ChevronDown size={16} />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandGroup heading="models">
                <CommandItem
                  key={model}
                  onSelect={() => onServiceSelect(model)}
                  className="flex justify-between text-sm"
                  disabled={currentModel === model}
                >
                  {model}
                  <Check
                    size={16}
                    className={cn(
                      currentModel === model ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              </CommandGroup>
            </CommandList>

            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem className="cursor-pointer" onSelect={() => {}}>
                  <PlusCircle size={20} className="mr-2" />
                  데이터 튜닝
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
