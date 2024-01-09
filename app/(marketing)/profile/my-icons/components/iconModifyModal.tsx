import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { baseUrl } from "@/lib/axiosConfig";
import { cn } from "@/lib/utils";
import { useClickAway } from "@uidotdev/usehooks";
import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";

const IconModifyModal = ({
  id,
  setIconEditModal,
  refetch,
}: {
  id: string;
  setIconEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: any;
}) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    setIconEditModal(false);
  });
  const [processingDelete, setProcessingDelete] = useState(false);
  const sendDeleteRequest = async () => {
    try {
      setProcessingDelete(true);
      const res = await axios.delete(`${baseUrl}/icon/${id}`);
      console.log(res);
      refetch();
      toast({
        title: "Icon deleted",
      });
      setIconEditModal(false);
      setProcessingDelete(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className=" h-screen w-full  bg-[#000000B3] fixed top-0 left-0 flex items-center justify-center z-10">
      <div className="md:w-1/4 rounded-md bg-white " ref={ref}>
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Edit Icon
          </h3>
          <button
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-foreground/60 "
            )}
            onClick={() => setIconEditModal(false)}
          >
            <X width={15} height={15} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-2">
            Deleting Icon can&apos;t be undone.
          </p>
          <button
            onClick={sendDeleteRequest}
            className={cn(buttonVariants({ variant: "destructive" }))}
            disabled={processingDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default IconModifyModal;
