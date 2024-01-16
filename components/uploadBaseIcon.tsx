"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { baseUrl } from "@/lib/axiosConfig";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  platform: z.enum(["WINDOWS", "MACOS", "OTHER"]),
  icon: z.custom((val: any) => {
    if (val.length === 1) {
      return true;
    }
    return false;
  }, "Upload Image"),
});

const UploadBaseIcon = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // TODO: handling isSubmitting state is pending
    const id = toast.loading("Uploading Icon");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("platform", data.platform);
    formData.append("icon", data.icon[0]);
    try {
      const res = await axios.post(`${baseUrl}/baseicons/upload`, formData);
      toast.success("Upload successful ", { id });
    } catch (error: any) {
      toast.error("Something went wrong", { id });
    }
  }
  return (
    <div className="border py-6 px-4 shadow-sm w-1/3 rounded-md">
      <h1 className="text-lg font-bold text-center">Upload Base Icon</h1>
      <div className="mt-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div>
            <Label htmlFor="icon">Icon:</Label>
            <Input {...form.register("icon")} id="icon" type="file" />

            {form.formState.errors.icon ? (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {String(form.formState.errors.icon.message)}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="picture">Name:</Label>
            <Input
              {...form.register("name")}
              id="picture"
              type="text"
              placeholder="Default windows"
            />
            {form.formState.errors.name ? (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="picture">Platform:</Label>
            <RadioGroup
              className="ml-2 text-foreground/60 mt-1"
              onValueChange={(e) =>
                form.setValue("platform", e as "WINDOWS" | "MACOS" | "OTHER")
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="WINDOWS" id="r1" />
                <Label htmlFor="r1">Windows</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MACOS" id="r2" />
                <Label htmlFor="r2">MacOS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="OTHER" id="r3" />
                <Label htmlFor="r3">Other</Label>
              </div>
            </RadioGroup>
            {form.formState.errors.platform ? (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {form.formState.errors.platform.message}
              </p>
            ) : null}
          </div>
          <div>
            <Button disabled={form.formState.isSubmitting} className="mt-1">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBaseIcon;
