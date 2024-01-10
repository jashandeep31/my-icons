import { Button } from "@/components/ui/button";
import { updateConvertedIconsUrl } from "@/store/features/playground/convertedIconsSlice";
import axios from "axios";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
// Function to convert data URL to Blob
function dataURLtoBlob(dataURL: string) {
  const arr = dataURL.split(",");
  const matchResult = arr[0].match(/:(.*?);/);

  if (matchResult) {
    const mime = matchResult[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  } else {
    // Handle the case when the regex doesn't match
    throw new Error("Invalid dataURL format");
  }
}

const ExportButton = ({
  setFinalFormModalState,
}: {
  setFinalFormModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();

  //  TODO: descide about this
  // const downloadImage = (dataURL: string) => {
  //   const link = document.createElement("a");
  //   link.href = dataURL;
  //   link.download = "image1.png";
  //   link.click();
  // };

  const handleCaptureClick = async () => {
    const container = document.querySelector("#PlayGroundParent");
    if (container instanceof HTMLElement) {
      const canvas = await html2canvas(container, {
        backgroundColor: "transparent", // Set background color to transparent
      });
      const dataURL = canvas.toDataURL("image/png");
      // submitting the form
      const form = new FormData();
      form.append("image", dataURLtoBlob(dataURL));
      axios
        .post(process.env.CONVERTER_URL as string, form)
        .then((res) => {
          dispatch(
            updateConvertedIconsUrl({
              icoURL: res.data.url,
              pngURL: dataURL,
            })
          );
          setFinalFormModalState(true);
          return res.data.url;
        })
        .catch((e) => {
          console.log(e);
        });
      // downloadImage(dataURL);
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
