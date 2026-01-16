import type {
	ByPostOption,
	CentralLabBranch,
	ContainerAfterTested,
	DeliveryMeans,
	MoreInformation,
	Objective,
	PaymentMethod,
	ReportLanguage,
	SampleCondition,
	SampleTemperature,
	TestMethod,
	TRInformChannel,
} from "./central-lab-form";

export interface Step1LabTestInformation {
	centralLabBranch: CentralLabBranch;
	companyNameEn: string;
	companyNameTh: string;
	companyAddressEn: string;
	companyAddressTh: string;
	taxCompanyName: string;
	taxCompanyAddress: string;
	taxIdentificationNumber: string;
	branchName: string;
	requiredReportIn: ReportLanguage[];
	originalTRTransfer: boolean;
	byPost: ByPostOption;
	byPostAddress: string;
	trInform: TRInformChannel;
	contactPersonName: string;
	contactPersonPotision: string;
	contactPersonTel: string;
	contactPersonFax: string;
	contactPersonMobile: string;
	contactPersonLineId: string;
	contactPersonEmail: string;
}

export interface SampleListItem {
	sampleName: string;
	customerCode: string;
	quantityPerContainer: number;
	containerUnit: string;
	totalContainer: number;
	sampleCondition: SampleCondition;
	testItem: string;
}

export interface Step2Sample {
	objectives: Objective;
	objectivesOther: string;
	moreInformation: MoreInformation;
	standardLimitation: string;
	containerAfterTested: ContainerAfterTested;
	temperatureAtSampleReceived: SampleTemperature;
	sampleDeliveryMeans: DeliveryMeans;
	sampleDeliveryMeansOther: string;
	sampleList: SampleListItem[];
}

export interface Step3Option {
	testMethod: TestMethod;
	remark: string;
	payment: PaymentMethod;
}

export interface Step4SummaryAndSubmit {
	sendBy: string;
}

export interface ApplicationContent {
	step1LabTestInformation: Step1LabTestInformation;
	step2Sample: Step2Sample;
	step3Option: Step3Option;
	step4SummaryAndSubmit: Step4SummaryAndSubmit;
}

export interface ApplicationData {
	id: string;
	status: string;
	content: ApplicationContent;
	userLineId: string;
	deletedAt: string | null;
	createdBy: string;
	updatedBy: string | null;
	createdAt: string;
	updatedAt: string | null;
}

export interface ApplicationDetailResponse {
	message: string;
	msgCode: string;
	data: ApplicationData;
	reqId: string;
}
