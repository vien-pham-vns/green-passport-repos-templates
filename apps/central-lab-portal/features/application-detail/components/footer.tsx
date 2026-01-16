import DisplayCheckboxField from "@/components/application-detail/display-checkbox-field";
import { cn } from "@/lib/utils";

const BlackEmptyLine = () => {
	return <div className="border-b border-black w-10 h-4" />;
};

export default function ApplicationDetailFooter({
	sendBy,
	tel,
}: {
	sendBy?: string;
	tel?: string;
}) {
	return (
		<div className="col-span-12 border-r border-b border-black bg-white">
			{/* Top Banner */}
			<div className="text-center font-bold text-xs py-1 border-b border-black bg-white">
				หากสงสัยเกี่ยวกับผลการทดสอบ กรุณาติดต่อกลับภายใน 7 วัน หลังจากได้รับใบรายงานผลทดสอบ
			</div>

			<div className={cn("cla-review-form-section-field-label", "flex")}>
				{/* Column 1: Sent by - 30% width */}
				<div className="w-[30%] px-2 py-2 flex flex-col justify-between border-r border-black">
					<div className="space-y-1 mt-6">
						<div className="flex items-center gap-1">
							<span className="whitespace-nowrap">ผู้ส่งตัวอย่าง / Sent by :</span>
							<div className="flex-1 flex items-center">
								(
								<div className="flex-1 border-b border-black h-4 text-center">
									{sendBy}
								</div>
								)
							</div>
						</div>
						<div
							className={cn(
								"text-center italic",
								"cla-review-form-section-field-label",
							)}
						>
							(ชื่อ-นามสกุล ตัวบรรจง)
						</div>
					</div>
					<div className="space-y-1">
						<div className="flex items-center justify-between gap-1">
							<span className="whitespace-nowrap">วันที่ / Date :</span>
							<div className="flex items-center gap-1">
								<BlackEmptyLine /> /
								<BlackEmptyLine /> /
								<BlackEmptyLine />
							</div>
						</div>
						<div className="flex items-center justify-between gap-1">
							<span className="whitespace-nowrap">โทรศัพท์ / Tel :</span>
							<div className="flex h-4 px-1">{tel}</div>
						</div>
					</div>
				</div>

				{/* Column 2: Staff only - 30% width */}
				<div className="w-[30%] px-2 py-2 flex flex-col">
					<div
						className={cn(
							"cla-review-form-section-field-label",
							"text-center font-bold mb-2 underline",
						)}
					>
						Staff only
					</div>
					<div className="space-y-2 flex-1 flex flex-col">
						<div className="flex items-center gap-1">
							<span className="whitespace-nowrap">
								ผู้รับตัวอย่าง / Received by : (
							</span>
							<div className="flex-1 border-b border-black h-4" />
							<span>)</span>
						</div>
						<div className="mt-1">
							<div className="flex items-center gap-1">
								<span className="whitespace-nowrap">วันที่ / Date :</span>
								<div className="flex items-center gap-1">
									<BlackEmptyLine /> /
									<BlackEmptyLine /> /
									<BlackEmptyLine />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Column 3: Review - 40% width */}
				<div className="w-[40%] px-2 py-2 flex flex-col">
					<div
						className={cn(
							"cla-review-form-section-field-label",
							"text-center font-bold underline mb-2",
						)}
					>
						ทบทวนคำขอรับบริการ
					</div>
					<div
						className="grid gap-x-2 gap-y-1 mb-2"
						style={{ gridTemplateColumns: "1.4fr 0.6fr" }}
					>
						<DisplayCheckboxField
							label="สามารถให้บริการได้ทั้งหมด"
							isSelected={false}
						/>
						<DisplayCheckboxField
							label="ไม่สามารถให้บริการได้"
							isSelected={false}
						/>
						<DisplayCheckboxField
							label="สามารถให้บริการได้บางส่วนและส่งทดสอบภายนอกบางส่วน"
							isSelected={false}
						/>
						<DisplayCheckboxField label="ส่งทดสอบภายนอก" isSelected={false} />
					</div>
					<div className="m-auto">
						<div className="flex items-center gap-1">
							<span className="whitespace-nowrap pl-8">ผู้ทบทวน :</span>
							<div className="flex-1 flex items-center"></div>
						</div>
						<div className="flex items-center gap-1">
							<span className="whitespace-nowrap pl-8">วันที่ / Date :</span>
							<div className="flex items-center gap-1">
								<BlackEmptyLine /> /
								<BlackEmptyLine /> /
								<BlackEmptyLine />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
