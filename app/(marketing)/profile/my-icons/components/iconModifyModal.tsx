"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { baseUrl } from "@/lib/axiosConfig";
import { cn } from "@/lib/utils";
import { iconTypes } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClickAway } from "@uidotdev/usehooks";
import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3, "minimum 3 char"),
  public: z.boolean(),
});

const IconModifyModal = ({
  id,
  icon,
  setIconEditModal,
  refetch,
}: {
  id: string;
  setIconEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  icon: iconTypes;
  refetch: any;
}) => {
  const [publicStatus, setPublicStatus] = useState<boolean>(icon.public);
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
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: icon.name,
      public: Boolean(icon.public),
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      data.public = publicStatus;
      const res = await axios.patch(`${baseUrl}/icon/${id}`, data);
      refetch();
      toast({
        title: "Icon Updated",
      });
      setIconEditModal(false);
    } catch (e) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className=" h-screen w-full  bg-[#000000B3] fixed top-0 left-0 flex items-center justify-center z-10">
      <div className=" mx-4 w-full md:w-1/4 rounded-md bg-white " ref={ref}>
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
        <div className="px-4 py-2">
          <form
            action=""
            className="flex flex-col gap-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <Label>Name:</Label>
              <Input {...form.register("name")} type="text" placeholder="" />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="terms"
                checked={publicStatus}
                onCheckedChange={(e: boolean) => {
                  setPublicStatus(e);
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Public?
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Update
              </Button>
              <button
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "text-red-600 border-red-600  hover:bg-red-200"
                )}
                onClick={sendDeleteRequest}
                type="button"
                disabled={processingDelete}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IconModifyModal;
