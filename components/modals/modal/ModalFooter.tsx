import { MouseEvent } from "react";
import { Button } from "@components/ui/button";

type Props = {
  loading: boolean;
  confirmButtonVariant: "default" | "destructive";
  onCancel: () => void;
  onConfirm: (event: MouseEvent<HTMLElement>) => void;
};

const ModalFooter = ({
  loading,
  confirmButtonVariant,
  onCancel,
  onConfirm,
}: Props) => {
  return (
    <div className="flex items-center justify-center space-x-2 w-full">
      <Button
        disabled={loading}
        variant="outline"
        onClick={onCancel}
        className="w-[100px]"
      >
        취소
      </Button>
      <Button
        disabled={loading}
        variant={confirmButtonVariant}
        onClick={onConfirm}
        className="w-[100px]"
      >
        확인
      </Button>
    </div>
  );
};

export default ModalFooter;
