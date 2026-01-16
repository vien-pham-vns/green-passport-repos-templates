import Image from "@/components/image";
import { cn } from "@/lib/utils";

export default function CentralLabInfo({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col md:flex-row items-start gap-5", className)}
    >
      <Image
        internalAsset
        src={`/assets/central-lab-logo.png`}
        alt="Logo"
        width={92}
        height={92}
      />
      <div className="leading-tight">
        <h1 className="text-xl font-bold">
          บริษัท ห้องปฏิบัติการกลาง (ประเทศไทย) จำกัด
        </h1>
        <h2 className="text-lg">Central Laboratory (Thailand) Co., Ltd.</h2>
        <p className="text-sm">www.centrallabthai.com</p>
        <p className="text-xs">เลขประจำตัวผู้เสียภาษี / TAX ID 0105546096453</p>
      </div>
    </div>
  );
}
