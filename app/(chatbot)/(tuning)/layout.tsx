import { ReactNode } from "react";

const TuningLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="p-4 text-2xl font-bold">Fine Tune 모델 목록</div>
      {children}
    </>
  );
};

export default TuningLayout;
