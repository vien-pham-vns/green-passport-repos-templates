import DisplayCheckboxField from "@/components/application-detail/display-checkbox-field";
import ApplicationDetail from "@/features/application-detail/components";
import { cn } from "@/lib/utils";
import { DeliveryMeans } from "@/types/central-lab-form";

export default function ApplicationDetailSampleDeliveryMeans({
  deliveryMeans,
  deliveryMeansOther,
}: {
  deliveryMeans?: DeliveryMeans;
  deliveryMeansOther?: string;
}) {
  return (
    <ApplicationDetail.Section
      title="วิธีการจัดส่งตัวอย่าง / Sample Delivery Means :"
      colSpan={12}
      rowSpan={2}
      layout="horizontal"
    >
      <div
        className={cn(
          "grid grid-cols-[1fr_1fr_1fr] gap-x-8 gap-y-1 w-full items-start ml-2",
          "cla-review-form-section-field-label",
        )}
      >
        <div className="space-y-1">
          <DisplayCheckboxField
            isSelected={deliveryMeans === DeliveryMeans.CLT_STAFF_PICKUP}
            label="เจ้าหน้าที่ CLT ไปรับ / Pickup by CLT Staff"
          />
          <DisplayCheckboxField
            isSelected={deliveryMeans === DeliveryMeans.CLT_STAFF_SAMPLING}
            label="เจ้าหน้าที่ CLT ไปสุ่ม / By CLT Staff Sampling"
          />
        </div>
        <div className="space-y-1">
          <DisplayCheckboxField
            isSelected={deliveryMeans === DeliveryMeans.HAND}
            label="ส่งด้วยตนเอง / By hand"
          />
          <DisplayCheckboxField
            isSelected={deliveryMeans === DeliveryMeans.LOGISTIC}
            label="ส่งทางบริการขนส่งสินค้า / By Logistic"
          />
        </div>
        <div className="flex items-start gap-2 h-full">
          <DisplayCheckboxField
            isSelected={deliveryMeans === DeliveryMeans.OTHER}
            label="อื่นๆ / Other :"
          />
          <div className="border-b border-black w-32 h-4 flex-1">
            {deliveryMeansOther}
          </div>
        </div>
      </div>
    </ApplicationDetail.Section>
  );
}
