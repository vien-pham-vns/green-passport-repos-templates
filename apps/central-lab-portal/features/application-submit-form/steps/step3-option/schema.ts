import z from "zod";
import { REQUIRED_MESSAGE } from "@/features/application-submit-form/utils";
import { PaymentMethod, TestMethod } from "@/types/central-lab-form";

export const step3OptionSchema = z.object({
  testMethod: z.enum(TestMethod, {
    message: REQUIRED_MESSAGE,
  }),
  remark: z
    .string()
    .trim()
    .max(1000, "Remark must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  payment: z.enum(PaymentMethod, {
    message: REQUIRED_MESSAGE,
  }),
});

export type Step3OptionData = z.infer<typeof step3OptionSchema>;
