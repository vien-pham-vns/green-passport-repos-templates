import z from "zod";
import { REQUIRED_MESSAGE } from "@/features/application-submit-form/utils";
import {
	ContainerAfterTested,
	DeliveryMeans,
	MoreInformation,
	Objective,
	SampleCondition,
	SampleTemperature,
} from "@/types/central-lab-form";

// Helper to convert Enum to Zod-friendly tuple for z.enum()
const enumToValues = <T extends Record<string, string>>(e: T) =>
	Object.values(e) as [string, ...string[]];

export const step2SampleSchema = z
	.object({
		objectives: z.enum(enumToValues(Objective), {
			message: REQUIRED_MESSAGE,
		}),
		objectivesOther: z.string().trim().optional(),
		moreInformation: z
			.enum(MoreInformation, {
				message: REQUIRED_MESSAGE,
			})
			.optional(),
		standardLimitation: z.string().trim().optional(),
		containerAfterTested: z.enum(enumToValues(ContainerAfterTested), {
			message: REQUIRED_MESSAGE,
		}),
		temperatureAtSampleReceived: z.enum(enumToValues(SampleTemperature), {
			message: REQUIRED_MESSAGE,
		}),
		sampleDeliveryMeans: z.enum(enumToValues(DeliveryMeans), {
			message: REQUIRED_MESSAGE,
		}),
		sampleDeliveryMeansOther: z.string().trim().optional(),
		sampleList: z
			.array(
				z.object({
					sampleName: z.string().trim().min(1, REQUIRED_MESSAGE),
					customerCode: z.string().trim().min(1, REQUIRED_MESSAGE),
					quantityPerContainer: z.number().min(1, REQUIRED_MESSAGE),
					containerUnit: z.string().trim().min(1, REQUIRED_MESSAGE),
					totalContainer: z.number().min(1, REQUIRED_MESSAGE),
					sampleCondition: z.enum(enumToValues(SampleCondition), {
						message: REQUIRED_MESSAGE,
					}),
					testItem: z.string().trim().min(1, REQUIRED_MESSAGE),
				}),
			)
			.min(1, "At least one sample is required"),
	})
	.refine(
		(data) => {
			if (data.objectives === Objective.OTHER) {
				return data.objectivesOther && data.objectivesOther.trim().length > 0;
			}
			return true;
		},
		{
			message: REQUIRED_MESSAGE,
			path: ["objectivesOther"],
		},
	)
	.refine(
		(data) => {
			if (data.moreInformation === MoreInformation.SHOW_STANDARD_LIMITATION) {
				return (
					data.standardLimitation && data.standardLimitation.trim().length > 0
				);
			}
			return true;
		},
		{
			message: REQUIRED_MESSAGE,
			path: ["standardLimitation"],
		},
	)
	.refine(
		(data) => {
			if (data.sampleDeliveryMeans === DeliveryMeans.OTHER) {
				return (
					data.sampleDeliveryMeansOther &&
					data.sampleDeliveryMeansOther.trim().length > 0
				);
			}
			return true;
		},
		{
			message: REQUIRED_MESSAGE,
			path: ["sampleDeliveryMeansOther"],
		},
	);

export type Step2SampleData = z.infer<typeof step2SampleSchema>;
