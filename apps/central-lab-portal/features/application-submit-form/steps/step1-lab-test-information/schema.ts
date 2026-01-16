import z from "zod";
import { REQUIRED_MESSAGE } from "@/features/application-submit-form/utils";
import { phoneNumberRegex } from "@/lib/constants";
import {
  ByPostOption,
  CentralLabBranch,
  ReportLanguage,
  TRInformChannel,
} from "@/types/central-lab-form";

export const step1LabTestInformationSchema = z
  .object({
    centralLabBranch: z.enum(CentralLabBranch, {
      message: "Please select at least one Central Lab",
    }),
    companyNameEn: z.string().trim().optional(),
    companyNameTh: z.string().trim().min(1, REQUIRED_MESSAGE),
    companyAddressEn: z.string().trim().optional(),
    companyAddressTh: z.string().trim().min(1, REQUIRED_MESSAGE),

    taxCompanyName: z.string().trim().optional().or(z.literal("")),
    taxCompanyAddress: z.string().trim().optional().or(z.literal("")),
    taxIdentificationNumber: z.string().trim().optional().or(z.literal("")),
    branchName: z.string().trim().optional().or(z.literal("")),

    requiredReportIn: z
      .array(z.enum(ReportLanguage), {
        message: REQUIRED_MESSAGE,
      })
      .min(1, REQUIRED_MESSAGE),
    originalTRTransfer: z.boolean(),
    byPost: z.enum(ByPostOption, {
      message: REQUIRED_MESSAGE,
    }),
    byPostAddress: z.string().trim().optional(),
    trInform: z.enum(TRInformChannel, {
      message: REQUIRED_MESSAGE,
    }),

    contactPersonName: z.string().trim().min(1, REQUIRED_MESSAGE),
    contactPersonPotision: z.string().trim().optional(),
    contactPersonTel: z
      .string()
      .trim()
      .min(1, REQUIRED_MESSAGE)
      .regex(phoneNumberRegex, "Invalid phone number"),
    contactPersonFax: z.string().trim().optional(),
    contactPersonMobile: z
      .string()
      .trim()
      .regex(phoneNumberRegex, "Invalid phone number")
      .optional()
      .or(z.literal("")),
    contactPersonLineId: z.string().trim().optional(),
    contactPersonEmail: z
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.byPost === ByPostOption.OTHER) {
        return data.byPostAddress && data.byPostAddress.trim().length > 0;
      }
      return true;
    },
    {
      message: REQUIRED_MESSAGE,
      path: ["byPostAddress"],
    },
  )
  .refine(
    (data) => {
      if (data.trInform === TRInformChannel.FAX) {
        return data.contactPersonFax && data.contactPersonFax.trim().length > 0;
      }
      return true;
    },
    {
      message: REQUIRED_MESSAGE,
      path: ["contactPersonFax"],
    },
  )
  .refine(
    (data) => {
      if (data.trInform === TRInformChannel.LINE) {
        return (
          data.contactPersonLineId && data.contactPersonLineId.trim().length > 0
        );
      }
      return true;
    },
    {
      message: REQUIRED_MESSAGE,
      path: ["contactPersonLineId"],
    },
  )
  .refine(
    (data) => {
      if (data.trInform === TRInformChannel.EMAIL) {
        return (
          data.contactPersonEmail && data.contactPersonEmail.trim().length > 0
        );
      }
      return true;
    },
    {
      message: REQUIRED_MESSAGE,
      path: ["contactPersonEmail"],
    },
  )
  .superRefine((data, ctx) => {
    const taxFields = [
      { key: "taxCompanyName", value: data.taxCompanyName },
      { key: "taxCompanyAddress", value: data.taxCompanyAddress },
      { key: "taxIdentificationNumber", value: data.taxIdentificationNumber },
      { key: "branchName", value: data.branchName },
    ] as const;

    const filledTaxFields = taxFields.filter(
      (field) => field.value && field.value.trim().length > 0,
    );

    if (
      filledTaxFields.length > 0 &&
      filledTaxFields.length < taxFields.length
    ) {
      for (const field of taxFields) {
        if (!field.value || field.value.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: REQUIRED_MESSAGE,
            path: [field.key],
          });
        }
      }
    }

    if (
      data.taxIdentificationNumber &&
      data.taxIdentificationNumber.trim().length > 0
    ) {
      if (!/^[0-9]{13}$/.test(data.taxIdentificationNumber.trim())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid tax identification number",
          path: ["taxIdentificationNumber"],
        });
      }
    }
  });

export type Step1LabTestInformationData = z.infer<
  typeof step1LabTestInformationSchema
>;
