"use client";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Applies CSS fixes to the cloned document for html2canvas compatibility.
 * html2canvas has known issues with:
 * - Flexbox baseline alignment (items-baseline)
 * - Text vertical positioning with small font sizes
 * - Line-height calculations
 * - Text inside dotted border containers
 * - CSS Grid alignment
 */
const applyHtml2CanvasFixes = (clonedDoc: Document) => {
  const clonedElement = clonedDoc.getElementById("printable-form");
  if (!clonedElement) return;

  // Ensure the cloned element has fixed width for capture
  clonedElement.style.width = "1280px";
  clonedElement.style.margin = "0";

  // Remove shadows that shouldn't appear in PDF
  const shadowElements = clonedElement.querySelectorAll(".shadow-lg");
  for (const el of shadowElements) {
    el.classList.remove("shadow-lg");
  }

  // Fix 1: Convert items-baseline to items-start for flex containers
  // html2canvas doesn't properly calculate baseline alignment
  const baselineFlexElements =
    clonedElement.querySelectorAll(".items-baseline");
  for (const el of baselineFlexElements) {
    const htmlEl = el as HTMLElement;
    htmlEl.style.alignItems = "flex-start";
  }

  // Fix 2: Inject comprehensive CSS fixes
  const styleEl = clonedDoc.createElement("style");
  styleEl.textContent = `
		/* Force all text to render with consistent metrics */
		#printable-form * {
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-rendering: geometricPrecision;
		}

		/* Fix line-height for small text classes */
		#printable-form .leading-tight {
			line-height: 1.25 !important;
		}

		#printable-form .text-xs,
		#printable-form .cla-review-form-section-field-label {
			line-height: 1.3 !important;
		}

		#printable-form .text-sm {
			line-height: 1.3 !important;
		}

		/* Fix PDF text underline elements - shift text up */
		#printable-form .pdf-text-underline {
			position: relative;
			top: -2px;
			padding-bottom: 4px !important;
			line-height: 1.2 !important;
		}

		/* Fix grid items alignment - align to start instead of stretch */
		#printable-form .grid > .border-dotted,
		#printable-form .grid > [class*="border-dotted"],
		#printable-form .grid > .pdf-text-underline {
			align-self: start;
		}

		/* Fix flex containers with dotted borders */
		#printable-form .pdf-display-field {
			align-items: flex-start !important;
		}

		#printable-form .pdf-display-field > div {
			position: relative;
			top: -2px;
			padding-bottom: 4px !important;
		}

		/* Ensure min-height elements don't cause overflow */
		#printable-form .min-h-5,
		#printable-form [class*="min-h-"] {
			padding-top: 0;
		}

		/* Fix h-4 containers (16px height) with text */
		#printable-form .h-4.border-dotted,
		#printable-form .h-3.border-dotted,
		#printable-form .min-h-4.pdf-text-underline {
			overflow: visible;
		}

		/* Global fix: all elements with dotted bottom borders containing text */
		#printable-form [class*="border-dotted"]:not(:empty) {
			position: relative;
			top: -1px;
		}

        #printable-form .cla-review-form-section-title {
            margin-top: -4px;
            margin-bottom: 12px;
        }

        #printable-form .display-checkbox-field {
            margin-top: 8px !important;
        }

		#printable-form .application-root {
			border: none;
		}


	`;
  clonedDoc.head.appendChild(styleEl);
};

export default function DownloadPdfButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    const element = document.getElementById("printable-form");
    if (!element) return;

    try {
      setIsGenerating(true);

      // Ensure all fonts are loaded before capture
      await document.fonts.ready;

      // Capture the element using html2canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Increase scale for better resolution
        useCORS: true, // Handle cross-origin images if any
        logging: false,
        backgroundColor: "#ffffff",
        width: 1280, // Force the width to match the form container precisely
        onclone: applyHtml2CanvasFixes,
      });

      const imgData = canvas.toDataURL("image/png");

      // Initialize jsPDF with A4 format
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Scaling logic to ensure it fits within 1 A4 page
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;
      let xOffset = 0;
      let yOffset = 0;

      if (imgHeight > pdfHeight) {
        // If content is taller than A4, scale down to fit height
        finalHeight = pdfHeight;
        finalWidth = (imgProps.width * pdfHeight) / imgProps.height;
        xOffset = (pdfWidth - finalWidth) / 2;
      } else {
        // Center vertically if it's shorter than A4
        yOffset = (pdfHeight - imgHeight) / 2;
      }

      pdf.addImage(imgData, "PNG", xOffset, yOffset, finalWidth, finalHeight);

      // Download the PDF
      pdf.save(
        `application-detail-${new Date().toISOString().split("T")[0]}.pdf`,
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed top-8 right-8 z-50 no-print">
      <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-border shadow-lg">
        <Button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className={cn(
            "flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
