"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Upload } from "@components/Upload";
import { Button } from "@components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@components/ui/form";
import { CHAT_ROUTES } from "@constants/routes";
import { tuning, uploadFile } from "@actions/openai";
import { useModalStore } from "@stores/modal";
import { isFileObject } from "@/lib/guard";

const tuningFormSchema = z.object({
  file: z.instanceof(File),
});

export function FineTuningModal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModalStore();

  const form = useForm<z.infer<typeof tuningFormSchema>>({
    resolver: zodResolver(tuningFormSchema),
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = form;

  const file = watch("file");

  const onDrop = async (file: File[]) => {
    setValue("file", file[0]);
    clearErrors("file");
  };

  const onSubmit = async (data: z.infer<typeof tuningFormSchema>) => {
    const formData = new FormData();
    if (data.file) {
      formData.append("file", data.file);
      setLoading(true);
      const response = await uploadFile(formData);

      if (isFileObject(response)) {
        await tuning(response.id);
        setLoading(false);
        closeModal();
        toast.success("튜닝 요청에 성공하였습니다.");
        router.push(CHAT_ROUTES.TUNING_LIST);
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-10 w-full"
      >
        <div className="flex flex-col w-full gap-6">
          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem>
                <FormLabel>튜닝 데이터</FormLabel>
                <FormControl>
                  <Upload
                    onDrop={onDrop}
                    disabled={loading}
                    error={!!errors.file}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <span className="text-sm">{`파일명: ${file?.name ?? ""}`}</span>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            className="w-[30%]"
            variant={"secondary"}
            disabled={loading}
            onClick={closeModal}
            type="button"
          >
            취소
          </Button>
          <Button className="w-[30%]" disabled={loading} type="submit">
            업로드
          </Button>
        </div>
      </form>
    </Form>
  );
}
