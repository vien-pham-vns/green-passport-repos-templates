"use client";

import { StepContainer } from "@/components/central-lab-application-form/step-container";
import { CentralLabSection } from "./components/CentralLabSection";
import { ContactPersonSection } from "./components/ContactPersonSection";
import { DeliverySection } from "./components/DeliverySection";
import { TaxInvoiceSection } from "./components/TaxInvoiceSection";
import { TestReportSection } from "./components/TestReportSection";
import { useTaxInvoiceLogic } from "./hooks/use-tax-invoice-logic";

export const Step1LabTestInformation = () => {
	const {
		control,
		sameCompanyForTaxReport,
		setSameCompanyForTaxReport,
		isTaxInfoRequired,
	} = useTaxInvoiceLogic();

	return (
		<StepContainer
			title="Lab Test Information"
			description="Please provide your laboratory test information"
		>
			<CentralLabSection />

			<TestReportSection
				sameCompanyForTaxReport={sameCompanyForTaxReport}
				setSameCompanyForTaxReport={setSameCompanyForTaxReport}
			/>

			<TaxInvoiceSection
				control={control}
				sameCompanyForTaxReport={sameCompanyForTaxReport}
				isTaxInfoRequired={isTaxInfoRequired}
			/>

			<DeliverySection />

			<ContactPersonSection />
		</StepContainer>
	);
};
