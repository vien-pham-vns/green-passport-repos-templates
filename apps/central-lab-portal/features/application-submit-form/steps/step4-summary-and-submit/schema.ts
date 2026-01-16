import z from "zod";
import { REQUIRED_MESSAGE } from "@/features/application-submit-form/utils";

export const step4SummaryAndSubmitSchema = z.object({
	sendBy: z.string().trim().min(1, REQUIRED_MESSAGE),
});

export type Step4SummaryAndSubmitData = z.infer<
	typeof step4SummaryAndSubmitSchema
>;
