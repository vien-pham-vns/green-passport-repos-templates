import DisplayCheckboxField from "@/components/application-detail/display-checkbox-field";
import DisplayTextField from "@/components/application-detail/display-text-field";
import ApplicationDetail from "@/features/application-detail/components";
import { cn } from "@/lib/utils";
import type { ApplicationContent } from "@/types/application";
import {
	ByPostOption,
	ContainerAfterTested,
	MoreInformation,
	Objective,
	PaymentMethod,
	ReportLanguage,
	SampleTemperature,
	TestMethod,
	TRInformChannel,
} from "@/types/central-lab-form";

export default function Index({
	data,
	className,
}: {
	data: ApplicationContent;
	className?: string;
}) {
	const step1 = data.step1LabTestInformation;
	const step2 = data.step2Sample;
	const step3 = data.step3Option;
	const step4 = data.step4SummaryAndSubmit;

	return (
		<div id="printable-form" className="w-fit mx-auto">
			<ApplicationDetail className={className}>
				<ApplicationDetail.Header />
				<ApplicationDetail.Title />
				<ApplicationDetail.Branches selectedBranch={step1?.centralLabBranch} />

				<ApplicationDetail.InfoGrid>
					{/* Row 1-6: Report Info & Delivery */}
					<ApplicationDetail.Section
						title="ชื่อบริษัทและที่อยู่ที่ระบุในใบรายงานผล / Company name and address for Test report"
						colSpan={9}
						rowSpan={6}
					>
						<div
							className={cn("space-y-2", "cla-review-form-section-field-label")}
						>
							<div className="flex gap-4">
								<span>ต้องการในรายงานผลเป็น :</span>
								<div className="flex gap-4">
									<DisplayCheckboxField
										isSelected={step1?.requiredReportIn?.includes(
											ReportLanguage.TH,
										)}
										label="ไทย / Thai"
									/>
									<DisplayCheckboxField
										isSelected={step1?.requiredReportIn?.includes(
											ReportLanguage.EN,
										)}
										label="อังกฤษ / English"
									/>
								</div>
							</div>
							<DisplayTextField
								label="ชื่อ-ที่อยู่ (ภาษาไทย/Thai)"
								value={`${step1?.companyNameTh || ""} ${step1?.companyAddressTh || ""}`}
							/>
							<div className="border-b border-black border-dotted h-4 w-full" />

							<DisplayTextField
								label="ชื่อ-ที่อยู่ (อังกฤษ/English)"
								value={`${step1?.companyNameEn || ""} ${step1?.companyAddressEn || ""}`}
							/>
							<div className="border-b border-black border-dotted h-4 w-full" />
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title="ผลฉบับจริง / Original TR Transfer"
						colSpan={3}
						rowSpan={6}
					>
						<div
							className={cn("space-y-1", "cla-review-form-section-field-label")}
						>
							<DisplayCheckboxField
								isSelected={step1?.originalTRTransfer}
								label="มารับด้วยตัวเอง / By hand"
							/>
							<p className="font-bold text-center mt-2">
								ส่งทางไปรษณีย์ / By post
							</p>
							<div className="space-y-1">
								<DisplayCheckboxField
									isSelected={step1?.byPost === ByPostOption.REPORT_ADDRESS}
									label="ตามที่อยู่ในรายงานผล"
								/>
								<DisplayCheckboxField
									isSelected={step1?.byPost === ByPostOption.INVOICE_ADDRESS}
									label="ตามที่อยู่ในใบกำกับภาษี"
								/>
								<div className="flex flex-col gap-1">
									<DisplayCheckboxField
										isSelected={step1?.byPost === ByPostOption.OTHER}
										label="ตามที่อยู่อื่นๆ (ระบุหมายเหตุ)"
									/>
									{step1?.byPost === ByPostOption.OTHER && (
										<div className="pdf-text-underline text-[10px] ml-6">
											{step1?.byPostAddress}
										</div>
									)}
								</div>
							</div>
						</div>
					</ApplicationDetail.Section>

					{/* Row 7-10: Invoice & Notifications & Price Quote */}
					<ApplicationDetail.Section
						title="ชื่อบริษัทและที่อยู่ที่ระบุในใบกำกับภาษี / Company name and address for Tax invoice"
						colSpan={9}
						rowSpan={3}
					>
						<div
							className={cn(
								"grid grid-cols-[auto,1fr,auto,1fr] gap-x-2 gap-y-1",
								"cla-review-form-section-field-label",
							)}
						>
							<span className="whitespace-nowrap">เลขประจำตัวผู้เสียภาษี :</span>
							<div className="pdf-text-underline">
								{step1?.taxIdentificationNumber}
							</div>
							<span className="whitespace-nowrap">สาขาที่ :</span>
							<div className="pdf-text-underline">{step1?.branchName}</div>
						</div>
						<div className="pdf-text-underline min-h-4 mt-2">
							{step1?.taxCompanyName}
						</div>
						<div className="pdf-text-underline min-h-4 mt-2">
							{step1?.taxCompanyAddress}
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title="การแจ้งผลทดสอบ / TR Inform"
						colSpan={3}
						rowSpan={2}
					>
						<div
							className={cn(
								"grid grid-cols-2 gap-x-2 gap-y-1 mt-1",
								"cla-review-form-section-field-label",
							)}
						>
							<DisplayCheckboxField
								isSelected={step1?.trInform?.includes(TRInformChannel.EMAIL)}
								label="E-mail"
							/>
							<DisplayCheckboxField
								isSelected={step1?.trInform?.includes(TRInformChannel.FAX)}
								label="Fax"
							/>
							<DisplayCheckboxField
								isSelected={step1?.trInform?.includes(TRInformChannel.LINE)}
								label="LINE"
								className="col-span-2"
							/>
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title="อ้างอิงราคาจาก / Price Quote"
						colSpan={3}
						rowSpan={2}
					>
						<div
							className={cn(
								"flex items-baseline gap-1",
								"cla-review-form-section-field-label",
							)}
						>
							<span>Quotation no.:</span>
							<span className="flex-1 border-b border-black border-dotted"></span>
						</div>
					</ApplicationDetail.Section>

					{/* Row 11-20: Contact Person, Objective, Sale, More Info */}
					<ApplicationDetail.Section
						title="ผู้ติดต่อ / Contact person :"
						colSpan={3}
						rowSpan={10}
					>
						<div
							className={cn("space-y-1", "cla-review-form-section-field-label")}
						>
							<DisplayTextField
								label="ชื่อ-สกุล / Name"
								value={step1?.contactPersonName}
							/>
							<DisplayTextField
								label="ตำแหน่ง / Position"
								value={step1?.contactPersonPotision}
							/>
							<DisplayTextField
								label="โทรศัพท์ / Tel"
								value={step1?.contactPersonTel}
							/>
							<DisplayTextField
								label="โทรสาร / Fax"
								value={step1?.contactPersonFax}
							/>
							<DisplayTextField
								label="มือถือ / Mobile"
								value={step1?.contactPersonMobile}
							/>
							<DisplayTextField
								label="ไลน์ / LINE ID"
								value={step1?.contactPersonLineId}
							/>
							<DisplayTextField
								label="อีเมล์ / E-mail"
								value={step1?.contactPersonEmail}
							/>
							<div className="border-b border-black border-dotted h-3 mt-1" />
							<div className="border-b border-black border-dotted h-3 mt-1" />
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title="วัตถุประสงค์ / Objective :"
						colSpan={6}
						rowSpan={4}
					>
						<div
							className={cn(
								"grid grid-cols-2 gap-x-4 gap-y-1",
								"cla-review-form-section-field-label",
							)}
						>
							<DisplayCheckboxField
								isSelected={step2?.objectives === Objective.THAI_FDA_SUBMIT}
								label="เพื่อยื่น ขอ อย. / Thai FDA submit"
							/>
							<DisplayCheckboxField
								isSelected={step2?.objectives === Objective.GENERAL_INFORMATION}
								label="เพื่อทราบผล / General information"
							/>
							<DisplayCheckboxField
								isSelected={step2?.objectives === Objective.HEALTH_CERTIFICATE}
								label="ขอใบรับรองสุขอนามัย / Health Certificate"
							/>
							<DisplayCheckboxField
								isSelected={step2?.objectives === Objective.RESEARCH}
								label="งานวิจัย / Research"
							/>
							<DisplayCheckboxField
								isSelected={step2?.objectives === Objective.DOMESTIC_CONSUME}
								label="จำหน่ายในประเทศ / Domestic Consume"
							/>
							<div className="flex flex-col gap-1">
								<DisplayCheckboxField
									isSelected={step2?.objectives === Objective.OTHER}
									label="อื่นๆ / Other :"
								/>
								{step2?.objectives === Objective.OTHER && (
									<div className="pdf-text-underline text-[10px] ml-6">
										{step2?.objectivesOther}
									</div>
								)}
							</div>
							<div className="flex flex-col gap-1">
								<DisplayCheckboxField
									isSelected={step2?.objectives === Objective.EXPORT_TO_COUNTRY}
									label="ส่งออก / Export to Country :"
								/>
								{step2?.objectives === Objective.EXPORT_TO_COUNTRY && (
									<div className="pdf-text-underline text-[10px] ml-6">
										{step2?.objectivesOther}
									</div>
								)}
							</div>
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title="เจ้าหน้าที่งานขายที่ติดต่อ / Contact Person (Sale)"
						colSpan={3}
						rowSpan={3}
					>
						<div
							className={cn(
								"flex items-baseline gap-1",
								"cla-review-form-section-field-label",
							)}
						>
							<span>Name:</span>
							<span className="flex-1 border-b border-black border-dotted"></span>
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title="ข้อมูลเพิ่มเติม / More information :"
						colSpan={9}
						rowSpan={6}
					>
						<div
							className={cn("space-y-1", "cla-review-form-section-field-label")}
						>
							<div className="flex flex-col gap-1">
								<DisplayCheckboxField
									isSelected={step2?.moreInformation?.includes(
										MoreInformation.SHOW_STANDARD_LIMITATION,
									)}
									label="กรณีต้องการระบุค่ามาตรฐาน (โปรดระบุ) / Show Standard Limitation (please specify)"
								/>
								{step2?.moreInformation?.includes(
									MoreInformation.SHOW_STANDARD_LIMITATION,
								) && (
									<div className="pdf-text-underline min-h-3 ml-6">
										{step2?.standardLimitation}
									</div>
								)}
							</div>
							<DisplayCheckboxField
								isSelected={step2?.moreInformation?.includes(
									MoreInformation.SHOW_STANDARD_VALUES_AND_STATEMENT_OF_CONFORMITY,
								)}
								label="กรณีต้องการค่ามาตรฐานเพื่อตัดสินผลทดสอบ (คิดค่าธรรมเนียม) / Show Standard Values and Statement of Conformity (Charge)"
							/>
							<DisplayCheckboxField
								isSelected={step2?.moreInformation?.includes(
									MoreInformation.THE_MEASUREMENT_UNCERTAINTY,
								)}
								label="ค่าความไม่แน่นอนของผลทดสอบ (คิดค่าธรรมเนียม) / The measurement uncertainty (Charge)"
							/>
						</div>
					</ApplicationDetail.Section>

					{/* Row 21-24: Logistics Details */}
					<ApplicationDetail.Section
						title="การชำระเงิน / Payment :"
						colSpan={3}
						rowSpan={4}
					>
						<div
							className={cn(
								"grid grid-cols-2 gap-1",
								"cla-review-form-section-field-label",
							)}
						>
							<DisplayCheckboxField
								isSelected={step3?.payment === PaymentMethod.CASH}
								label="เงินสด / Cash"
							/>
							<DisplayCheckboxField
								isSelected={step3?.payment === PaymentMethod.CREDIT}
								label="เครดิต / Credit"
							/>
							<DisplayCheckboxField
								isSelected={step3?.payment === PaymentMethod.CHEQUE}
								label="เช็ค / Cheque"
							/>
							<DisplayCheckboxField
								isSelected={step3?.payment === PaymentMethod.TRANSFER}
								label="เงินโอน / Transfer"
							/>
							<DisplayCheckboxField
								isSelected={step3?.payment === PaymentMethod.CREDIT_CARD}
								label="บัตรเครดิต / Credit Card"
								className="col-span-2"
							/>
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title="ตัวอย่าง / ภาชนะที่ส่งทดสอบ : Sample / Container after tested"
						colSpan={5}
						rowSpan={4}
					>
						<div
							className={cn("space-y-1", "cla-review-form-section-field-label")}
						>
							<DisplayCheckboxField
								isSelected={
									step2?.containerAfterTested ===
									ContainerAfterTested.SAMPLE_RETURN
								}
								label="ขอรับคืนตัวอย่าง / Sample return (ภายใน 15 วันหลังส่งตัวอย่าง)"
							/>
							<DisplayCheckboxField
								isSelected={
									step2?.containerAfterTested ===
									ContainerAfterTested.CONTAINER_RETURN
								}
								label="ขอรับคืนภาชนะบรรจุ / Container return only"
							/>
							<DisplayCheckboxField
								isSelected={
									step2?.containerAfterTested === ContainerAfterTested.NO_RETURN
								}
								label="ไม่รับคืน / No return"
							/>
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title="อุณหภูมิขณะรับตัวอย่าง / Temperature at Sample Received :"
						colSpan={4}
						rowSpan={4}
					>
						<div
							className={cn("space-y-1", "cla-review-form-section-field-label")}
						>
							<DisplayCheckboxField
								isSelected={
									step2?.temperatureAtSampleReceived === SampleTemperature.ROOM
								}
								label="อุณหภูมิห้อง / Room temperature"
							/>
							<DisplayCheckboxField
								isSelected={
									step2?.temperatureAtSampleReceived ===
									SampleTemperature.CHILLED
								}
								label="แช่เย็น / Chilled"
							/>
							<DisplayCheckboxField
								isSelected={
									step2?.temperatureAtSampleReceived ===
									SampleTemperature.FROZEN
								}
								label="แช่แข็ง / Frozen"
							/>
						</div>
					</ApplicationDetail.Section>

					{/* Row 25-26: Sample Delivery Means */}
					<ApplicationDetail.SampleDeliveryMeans
						deliveryMeans={step2?.sampleDeliveryMeans}
						deliveryMeansOther={step2?.sampleDeliveryMeansOther}
					/>

					{/* Row 6: Sample Table */}
					<ApplicationDetail.SampleTable sampleList={step2?.sampleList} />

					{/* Row 7: Method & Remark & Totals */}
					<ApplicationDetail.Section
						title="วิธีการทดสอบ / Test method :"
						colSpan={9}
						rowSpan={1}
						layout="horizontal"
					>
						<div
							className={cn(
								"flex gap-4 w-full items-center",
								"cla-review-form-section-field-label",
							)}
						>
							<DisplayCheckboxField
								isSelected={step3?.testMethod === TestMethod.LAB}
								label="วิธีของห้องปฏิบัติการ / Laboratory method"
							/>
							<DisplayCheckboxField
								isSelected={step3?.testMethod === TestMethod.CUSTOMER}
								label="วิธีของลูกค้า / Customer method (โปรดระบุ)"
							/>
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title=""
						colSpan={3}
						rowSpan={3}
						className="p-0"
					>
						<div
							className={cn(
								"grid grid-cols-[1fr,auto] h-full",
								"cla-review-form-section-field-label",
							)}
						>
							<div className="flex flex-col">
								<div className="border-b border-black p-1 flex justify-between items-center">
									<span>ราคา / Price</span>
								</div>
								<div className="border-b border-black p-1 flex justify-between items-center">
									<span>Vat 7%</span>
								</div>
								<div className="p-1 flex justify-between font-bold items-center">
									<span>รวม / Total</span>
								</div>
							</div>
						</div>
					</ApplicationDetail.Section>

					<ApplicationDetail.Section
						title="หมายเหตุ/Remark :"
						colSpan={9}
						rowSpan={2}
						layout="horizontal"
					>
						<div className="flex-1 flex flex-col h-full justify-start px-1">
							{step3?.remark}
							<div className="border-b border-black border-dotted w-full py-1" />
							<div className="border-b border-black border-dotted w-full py-1" />
						</div>
					</ApplicationDetail.Section>

					{/* Row 8: Footer */}
					<ApplicationDetail.Footer
						sendBy={step4?.sendBy}
						tel={step1?.contactPersonTel}
					/>
				</ApplicationDetail.InfoGrid>
				<ApplicationDetail.DocumentNumber />
			</ApplicationDetail>
		</div>
	);
}
