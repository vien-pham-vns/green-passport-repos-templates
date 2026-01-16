import Image from "@/components/image";

export default function ApplicationDetailHeader() {
	return (
		<div className="flex justify-between items-start border-b pb-4 mb-4">
			<div className="flex gap-4">
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
			<div className="border border-black p-2 text-xs min-w-[200px]">
				<div className="text-center font-bold border-b border-black mb-1 pb-1">
					สำหรับเจ้าหน้าที่ / Staff only
				</div>
				<div className="grid grid-cols-[auto,1fr] gap-x-2 gap-y-1">
					<span>TA :</span>
					<span className="border-b border-black border-dotted h-3 w-full"></span>
					<span>วันที่รับตัวอย่าง :</span>
					<span className="border-b border-black border-dotted h-3 w-full"></span>
					<span>วันที่นัดรับผล :</span>
					<span className="border-b border-black border-dotted h-3 w-full"></span>
					<span>SO :</span>
					<span className="border-b border-black border-dotted h-3 w-full"></span>
				</div>
			</div>
		</div>
	);
}
