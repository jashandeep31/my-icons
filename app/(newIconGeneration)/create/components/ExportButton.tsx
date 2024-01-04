import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import React from "react";

const ExportButton = () => {
  const downloadImage = (dataURL: string) => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "image.png";
    link.click();
  };

  const handleCaptureClick = async () => {
    const container = document.querySelector("#PlayGroundParent");
    if (container instanceof HTMLElement) {
      const canvas = await html2canvas(container, {
        backgroundColor: "transparent", // Set background color to transparent
      });
      const dataURL = canvas.toDataURL("image/png");
      downloadImage(dataURL);
    } else {
      console.error(
        "Element with id 'PlayGroundParent' not found or not an HTMLElement."
      );
    }
  };

  return (
    <Button onClick={handleCaptureClick} className="flex gap-2">
      Export <Download width={15} height={15} />
    </Button>
  );
};

export default ExportButton;
