import {
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
} from "@/types/central-lab-form";

export const centralLabBranchOptions = [
  { value: CentralLabBranch.BANGKOK, label: "Bangkok Branch" },
  { value: CentralLabBranch.CHIANG_MAI, label: "Chiang Mai Branch" },
  { value: CentralLabBranch.KHON_KAEN, label: "Khon Kaen Branch" },
  { value: CentralLabBranch.SONGKHLA, label: "Songkhla Branch" },
  { value: CentralLabBranch.CHACHOENGSAO, label: "Chachoengsao Branch" },
  { value: CentralLabBranch.SAMUT_SAKHON, label: "Samut Sakhon Branch" },
];

export const requiredReportInOptions = [
  { value: ReportLanguage.TH, label: "Thai" },
  { value: ReportLanguage.EN, label: "English" },
];

export const trInformOptions = [
  { value: TRInformChannel.EMAIL, label: "Email" },
  { value: TRInformChannel.FAX, label: "Fax" },
  { value: TRInformChannel.LINE, label: "LINE" },
];

export const byPostOptions = [
  { value: ByPostOption.REPORT_ADDRESS, label: "Use Report Address" },
  { value: ByPostOption.INVOICE_ADDRESS, label: "Use Invoice Address" },
  { value: ByPostOption.OTHER, label: "Other Address" },
];

export const objectivesOptions = [
  { value: Objective.THAI_FDA_SUBMIT, label: "Thai FDA Submit" },
  { value: Objective.GENERAL_INFORMATION, label: "General Information" },
  { value: Objective.RESEARCH, label: "Research" },
  { value: Objective.HEALTH_CERTIFICATE, label: "Health Certificate" },
  { value: Objective.DOMESTIC_CONSUME, label: "Domestic Consume" },
  { value: Objective.EXPORT_TO_COUNTRY, label: "Export to Country" },
  { value: Objective.OTHER, label: "Other" },
];

export const moreInformationOptions = [
  {
    value: MoreInformation.SHOW_STANDARD_LIMITATION,
    label: "Show Standard Limitation (please specify)",
  },
  {
    value: MoreInformation.SHOW_STANDARD_VALUES_AND_STATEMENT_OF_CONFORMITY,
    label: "Show Standard Values and Statement of Conformity (Charge)",
  },
  {
    value: MoreInformation.THE_MEASUREMENT_UNCERTAINTY,
    label: "The Measurement Uncertainty (Charge)",
  },
];

export const containerAfterTestedOptions = [
  {
    value: ContainerAfterTested.SAMPLE_RETURN,
    label: "Sample Return (Within 15 days after sample submission)",
  },
  {
    value: ContainerAfterTested.CONTAINER_RETURN,
    label: "Container Return Only",
  },
  { value: ContainerAfterTested.NO_RETURN, label: "No Return" },
];

export const temperatureAtSampleReceivedOptions = [
  { value: SampleTemperature.ROOM, label: "Room Temperature" },
  { value: SampleTemperature.CHILLED, label: "Chilled" },
  { value: SampleTemperature.FROZEN, label: "Frozen" },
];

export const sampleDeliveryMeansOptions = [
  { value: DeliveryMeans.CLT_STAFF_PICKUP, label: "Pickup by CLT Staff" },
  { value: DeliveryMeans.CLT_STAFF_SAMPLING, label: "By CLT Staff Sampling" },
  { value: DeliveryMeans.HAND, label: "By Hand" },
  { value: DeliveryMeans.LOGISTIC, label: "By Logistic" },
  { value: DeliveryMeans.OTHER, label: "Other" },
];

export const sampleConditionOptions = [
  { value: SampleCondition.NORMAL, label: "Normal" },
  { value: SampleCondition.SPECIAL, label: "Special" },
];

export const testMethodOptions = [
  { value: TestMethod.LAB, label: "Laboratory Method" },
  { value: TestMethod.CUSTOMER, label: "Customer Method" },
];

export const paymentOptions = [
  { value: PaymentMethod.CASH, label: "Cash" },
  { value: PaymentMethod.CHEQUE, label: "Cheque" },
  { value: PaymentMethod.CREDIT_CARD, label: "Credit Card" },
  { value: PaymentMethod.CREDIT, label: "Credit" },
  { value: PaymentMethod.TRANSFER, label: "Transfer" },
];
