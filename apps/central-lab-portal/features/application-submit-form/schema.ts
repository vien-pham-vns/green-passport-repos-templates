import z from "zod";
import { step1LabTestInformationSchema } from "@/features/application-submit-form/steps/step1-lab-test-information/schema";
import { step2SampleSchema } from "@/features/application-submit-form/steps/step2-sample/schema";
import { step3OptionSchema } from "@/features/application-submit-form/steps/step3-option/schema";
import { step4SummaryAndSubmitSchema } from "@/features/application-submit-form/steps/step4-summary-and-submit/schema";
import {
	ByPostOption,
	CentralLabBranch,
	ContainerAfterTested,
	DeliveryMeans,
	MoreInformation,
	Objective,
	PaymentMethod,
	SampleCondition,
	SampleTemperature,
	TestMethod,
	TRInformChannel,
} from "@/types/central-lab-form";

export const centralLabApplicationSchema = z.object({
	step1LabTestInformation: step1LabTestInformationSchema,
	step2Sample: step2SampleSchema,
	step3Option: step3OptionSchema,
	step4SummaryAndSubmit: step4SummaryAndSubmitSchema,
});

export type CentralLabApplicationData = z.infer<
	typeof centralLabApplicationSchema
>;

export const centralLabApplicationDefaultValues: CentralLabApplicationData = {
	step1LabTestInformation: {
		centralLabBranch: CentralLabBranch.BANGKOK,
		companyNameEn: "",
		companyNameTh: "",
		companyAddressEn: "",
		companyAddressTh: "",
		taxCompanyName: "",
		taxCompanyAddress: "",
		taxIdentificationNumber: "",
		branchName: "",
		requiredReportIn: [],
		originalTRTransfer: true,
		byPost: ByPostOption.REPORT_ADDRESS,
		byPostAddress: "",
		trInform: TRInformChannel.EMAIL,
		contactPersonName: "",
		contactPersonPotision: "",
		contactPersonTel: "",
		contactPersonFax: "",
		contactPersonMobile: "",
		contactPersonLineId: "",
		contactPersonEmail: "",
	},
	step2Sample: {
		objectives: Objective.THAI_FDA_SUBMIT,
		objectivesOther: "",
		moreInformation: MoreInformation.SHOW_STANDARD_LIMITATION,
		standardLimitation: "",
		containerAfterTested: ContainerAfterTested.SAMPLE_RETURN,
		temperatureAtSampleReceived: SampleTemperature.ROOM,
		sampleDeliveryMeans: DeliveryMeans.CLT_STAFF_PICKUP,
		sampleDeliveryMeansOther: "",
		sampleList: [
			{
				sampleName: "",
				customerCode: "",
				quantityPerContainer: 1,
				containerUnit: "",
				totalContainer: 1,
				sampleCondition: SampleCondition.NORMAL,
				testItem: "",
			},
		],
	},
	step3Option: {
		testMethod: TestMethod.LAB,
		remark: "",
		payment: PaymentMethod.CASH,
	},
	step4SummaryAndSubmit: {
		sendBy: "",
	},
};
