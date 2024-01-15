"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { baseUrl } from "@/lib/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
type session = {
  name: string;
};

const formSchema = z.object({
  name: z.string().min(3, "Atleast 3 char"),
});

const UpdateName = ({ session }: { session: session }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session.name,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const id = toast.loading("Updating data");
    try {
      const res = await axios.patch(`${baseUrl}/user/`, data);
      toast.success("Updated Successfully 🎉", { id });
    } catch (error) {
      toast.error("Something went wrong", { id });
    }
  };
  return (
    <div>
      <Label>Name:</Label>
      <form action="" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex-wrap items-center flex gap-2">
          <Input {...form.register("name")} className="md:w-1/4" type="text" />
          {!form.formState.isSubmitting ? (
            <Button>Update</Button>
          ) : (
            <button
              className={cn(
                buttonVariants({ size: "sm" }),
                "flex items-center gap-2"
              )}
              disabled={true}
            >
              Upadating
              <Loader2 className="animate-spin" width={15} height={15} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateName;
