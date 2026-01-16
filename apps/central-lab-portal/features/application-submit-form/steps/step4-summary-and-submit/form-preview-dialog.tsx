import { useFormContext } from "react-hook-form";
import ScalableFormContainer from "@/components/application-detail/scalable-form-container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ApplicationDetail from "@/features/application-detail";
import type { CentralLabApplicationData } from "@/features/application-submit-form/schema";
import type { ApplicationContent } from "@/types/application";

const FormPreviewDialog = () => {
  const { getValues } = useFormContext<CentralLabApplicationData>();

  const formData = getValues() as ApplicationContent;

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Preview Form</Button>} />
      <DialogContent className="mb-8 flex h-[calc(100vh-4rem)] min-w-[calc(100vw-8rem)] md:min-w-[calc(100vw-36rem)] flex-col justify-between gap-0 p-0">
        <ScrollArea className="flex flex-col justify-between overflow-hidden">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6">Form Preview</DialogTitle>
            <DialogDescription
              render={
                <div className="p-0 sm:p-6">
                  <ScalableFormContainer baseWidth={1280}>
                    <ApplicationDetail
                      data={formData}
                      className="shadow-none border-none"
                    />
                  </ScalableFormContainer>
                </div>
              }
            />
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FormPreviewDialog;
