import { Button } from "@/components/ui/button";
import { updateConvertedIconsUrl } from "@/store/features/playground/convertedIconsSlice";
import axios from "axios";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

const ExportButton = ({
  setFinalFormModalState,
}: {
  setFinalFormModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const handleCaptureClick = async () => {
    const container = document.querySelector("#PlayGroundParent");
    if (container instanceof HTMLElement) {
      const canvas = await html2canvas(container, {
        backgroundColor: "transparent", // Set background color to transparent
      });
      const dataURL = canvas.toDataURL("image/png"); //base64 format
      dispatch(
        updateConvertedIconsUrl({
          pngURL: dataURL,
        })
      );
      setFinalFormModalState(true);
    } else {
      // TODO: handle error
    }
  };

  return (
    <Button onClick={handleCaptureClick} className="flex gap-2">
      Export <Download width={15} height={15} />
    </Button>
  );
};

export default ExportButton;
