"use client";

import * as React from "react";
import { Loader2, Download, Send } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFormatDate from "@/hooks/use-format-date";
import { ApplicationData, ApplicationStatus } from "../type";

interface ApplicationDetailContentProps {
  application: ApplicationData;
}

const DEFAULT_VALUE = "--";

export function ApplicationDetailContent({
  application,
}: ApplicationDetailContentProps) {
  const { formatDate } = useFormatDate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // Get the iframe URL from environment variable
  const iframeUrl = `${process.env.NEXT_PUBLIC_EGAP_CENTRAL_LAB_DOMAIN}/central-lab/applications/${application.id}`;

  // Format the title
  const formattedDate = formatDate(application.createdAt);
  const title = application.number;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download logic
    console.log("Download PDF for application:", application.id);
  };

  const handleSubmitTestResult = () => {
    // TODO: Implement submit test result logic
    console.log("Submit test result for application:", application.id);
  };

  const statusConfig = {
    [ApplicationStatus.WAITING]: {
      label: "Pending",
      variant: "outline" as const,
    },
    [ApplicationStatus.PROCESSING]: {
      label: "Processing",
      variant: "secondary" as const,
    },
    [ApplicationStatus.COMPLETED]: {
      label: "Completed",
      variant: "default" as const,
    },
    [ApplicationStatus.CANCELLED]: {
      label: "Cancelled",
      variant: "destructive" as const,
    },
    [ApplicationStatus.NEW]: {
      label: "New",
      variant: "outline" as const,
    },
  };

  const statusInfo =
    statusConfig[application.status] || statusConfig[ApplicationStatus.WAITING];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      {/* Left Column - 70% (7/10) */}
      <div className="lg:col-span-7">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-[80vh]">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Loading application form...
                    </p>
                  </div>
                </div>
              )}

              {hasError && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="flex flex-col items-center gap-2 text-center p-4">
                    <p className="text-sm text-destructive font-medium">
                      Failed to load application form
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Please check your connection and try again
                    </p>
                  </div>
                </div>
              )}

              <iframe
                src={iframeUrl}
                className="w-full h-full border-0 rounded-md"
                title={`Application ${application.number}`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - 30% (3/10) */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Application ID */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Application ID</p>
              <p className="text-sm font-semibold">
                {application.number || DEFAULT_VALUE}
              </p>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
            </div>

            {/* Payment ID */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Payment ID</p>
              <p className="text-sm font-semibold">
                {application.paymentId || DEFAULT_VALUE}
              </p>
            </div>

            {/* Created By */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Created By</p>
              <p className="text-sm font-semibold">
                {application.userCreated?.firstName || DEFAULT_VALUE}
              </p>
            </div>

            {/* Created Date */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Created Date</p>
              <p className="text-sm font-semibold">
                {formatDate(application.createdAt) || DEFAULT_VALUE}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <Button
                onClick={handleDownloadPDF}
                className="w-full"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>

              <Button
                onClick={handleSubmitTestResult}
                className="w-full"
                variant="default"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Test Result
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
