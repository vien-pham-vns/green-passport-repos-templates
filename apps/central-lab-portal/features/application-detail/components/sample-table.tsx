import { cn } from "@/lib/utils";
import type { SampleListItem } from "@/types/application";

export default function ApplicationDetailSampleTable({
  sampleList = [],
}: {
  sampleList?: SampleListItem[];
}) {
  const headerClass =
    "border-b border-r border-black flex items-center justify-center p-1 text-center font-bold";
  const subHeaderStaffClass =
    "border-b border-r border-black flex flex-col items-center justify-center p-1 text-center font-bold";
  const conditionHeaderClass =
    "border-b border-r border-black flex items-center justify-center p-0.5 text-center font-normal";
  const cellClass =
    "border-b border-r border-black h-8 flex items-center justify-center px-1 text-center overflow-hidden";
  const lastCellInRowClass =
    "border-b border-black h-8 flex items-center justify-center";

  // Ensure we always show at least 10 rows
  const displayRows = [...sampleList];
  while (displayRows.length < 10) {
    displayRows.push({} as SampleListItem);
  }

  return (
    <div className="col-span-12 border-r border-black">
      <div
        className={cn(
          "grid grid-cols-[0.5fr_1.5fr_0.5fr_0.5fr_2.5fr_0.5fr_1fr_0.5fr_0.5fr_1fr]",
          "cla-review-form-section-field-label",
        )}
      >
        {/* Row 1: Main Headers */}
        <div className={cn(headerClass, "row-span-3")}>
          ลำดับ <br /> No.
        </div>
        <div className={cn(headerClass, "row-span-3")}>
          ชื่อตัวอย่าง / รหัสตัวอย่างลูกค้า <br /> Sample & code Names
        </div>
        <div className={cn(headerClass, "row-span-3")}>
          ปริมาณต่อ <br /> หน่วยบรรจุ / <br /> Quantity per <br /> Container
        </div>
        <div className={cn(headerClass, "row-span-3")}>
          จำนวนหน่วย <br /> บรรจุทั้งหมด / <br /> Total <br /> Container
        </div>
        <div className={cn(headerClass, "row-span-3")}>
          รายการทดสอบ / Test item
        </div>
        <div className={cn(headerClass, "row-span-3")}>
          หน่วย <br /> ทดสอบ / <br /> Unit of <br /> Testing
        </div>
        <div className="border-b border-black flex items-center justify-center p-1 text-center font-bold col-span-4">
          สำหรับเจ้าหน้าที่ / Staff Only
        </div>

        {/* Row 2: Staff Sub-headers */}
        <div
          className={cn(
            subHeaderStaffClass,
            "row-span-2 col-start-7 row-start-2",
            "cla-review-form-section-field-label",
          )}
        >
          รหัสตัวอย่าง/ <br /> Sample code
          <div className="mt-0.5 underline">___/______</div>
        </div>
        <div
          className={cn(
            "border-b border-r border-black flex items-center justify-center p-1 text-center font-bold col-span-2 col-start-8 row-start-2",
            "cla-review-form-section-field-label",
          )}
        >
          สภาพตัวอย่าง
        </div>
        <div
          className={cn(
            "border-b border-black flex items-center justify-center p-1 text-center font-bold row-span-2 col-start-10 row-start-2",
            "cla-review-form-section-field-label",
          )}
        >
          ราคา (บาท) <br /> Price (Baht)
        </div>

        {/* Row 3: Condition Sub-headers */}
        <div
          className={cn(
            conditionHeaderClass,
            "col-start-8 row-start-3",
            "cla-review-form-section-field-label",
          )}
        >
          ปกติ <br /> Normal
        </div>
        <div
          className={cn(
            conditionHeaderClass,
            "col-start-9 row-start-3",
            "cla-review-form-section-field-label",
          )}
        >
          ไม่ปกติ <br /> Defect
        </div>

        {/* Body Rows */}
        {displayRows.map((sample, i) => (
          <div key={`sample-row-${i + 1}`} className="contents">
            <div className={cellClass}>{i + 1}</div>
            <div className={cellClass}>
              {sample.sampleName &&
                `${sample.sampleName} (${sample.customerCode})`}
            </div>
            <div className={cellClass}>
              {sample.quantityPerContainer} {sample.containerUnit}
            </div>
            <div className={cellClass}>{sample.totalContainer}</div>
            <div className={cellClass}>{sample.testItem}</div>
            <div className={cellClass}>{sample.containerUnit}</div>
            <div className={cellClass} />
            <div className={cellClass} />
            <div className={cellClass} />
            <div className={lastCellInRowClass} />
          </div>
        ))}
      </div>
    </div>
  );
}
