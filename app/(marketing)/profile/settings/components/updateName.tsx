"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { baseUrl } from "@/lib/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
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
    try {
      const res = await axios.patch(`${baseUrl}/user/`, data);
      toast({
        title: "Name is updated",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
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
