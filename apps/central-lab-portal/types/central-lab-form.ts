export enum CentralLabBranch {
  BANGKOK = "bangkok",
  CHIANG_MAI = "chiang-mai",
  KHON_KAEN = "khon-kaen",
  SONGKHLA = "songkhla",
  CHACHOENGSAO = "chachoengsao",
  SAMUT_SAKHON = "samut-sakhon",
}

export enum ReportLanguage {
  TH = "th",
  EN = "en",
}

export enum TRInformChannel {
  EMAIL = "email",
  FAX = "fax",
  LINE = "line",
}

export enum ByPostOption {
  REPORT_ADDRESS = "report-address",
  INVOICE_ADDRESS = "invoice-address",
  OTHER = "other",
}

// Additional enums for other steps to ensure scalability
export enum Objective {
  THAI_FDA_SUBMIT = "thai-fda-submit",
  GENERAL_INFORMATION = "general-information",
  RESEARCH = "research",
  HEALTH_CERTIFICATE = "health-certificate",
  DOMESTIC_CONSUME = "domestic-consume",
  EXPORT_TO_COUNTRY = "export-to-country",
  OTHER = "other",
}

export enum ContainerAfterTested {
  SAMPLE_RETURN = "sample-return",
  CONTAINER_RETURN = "container-return",
  NO_RETURN = "no-return",
}

export enum SampleTemperature {
  ROOM = "room",
  CHILLED = "chilled",
  FROZEN = "frozen",
}

export enum DeliveryMeans {
  CLT_STAFF_PICKUP = "clt-staff-pickup",
  CLT_STAFF_SAMPLING = "clt-staff-sampling",
  HAND = "hand",
  LOGISTIC = "logistic",
  OTHER = "other",
}

export enum SampleCondition {
  NORMAL = "normal",
  SPECIAL = "special",
}

export enum TestMethod {
  LAB = "lab",
  CUSTOMER = "customer",
}

export enum PaymentMethod {
  CASH = "cash",
  CHEQUE = "cheque",
  CREDIT_CARD = "credit-card",
  CREDIT = "credit",
  TRANSFER = "transfer",
}

export enum MoreInformation {
  SHOW_STANDARD_LIMITATION = "show-standard-limitation",
  SHOW_STANDARD_VALUES_AND_STATEMENT_OF_CONFORMITY = "show-standard-values-and-statement-of-conformity",
  THE_MEASUREMENT_UNCERTAINTY = "the-measurement-uncertainty",
}
