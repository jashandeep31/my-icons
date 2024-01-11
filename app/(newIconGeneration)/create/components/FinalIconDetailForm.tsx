import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { baseUrl } from "@/lib/axiosConfig";
import { cn } from "@/lib/utils";
import { selectConvertedIconsConfig } from "@/store/features/playground/convertedIconsSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClickAway } from "@uidotdev/usehooks";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Atleast 3 char"),
  platform: z.enum(["WINDOWS", "MACOS", "OTHER"]),
  public: z.boolean(),
});

const FinalIconDetailForm = ({
  setFinalFormModalState,
}: {
  setFinalFormModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    setFinalFormModalState(false);
  });
  const router = useRouter();

  const convertedIconsConfig = useSelector(selectConvertedIconsConfig);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Next js icon",
      public: true,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const form = new FormData();
    form.append("name", data.name);
    form.append("platform", data.platform);
    form.append("pngURL", convertedIconsConfig.pngURL);
    form.append("public", data.public.toString());

    try {
      const res = await axios.post(`${baseUrl}/icon`, form);
      router.push(`/icon/${res.data.icon.id}`);
    } catch (error: any) {
      console.log(error.response);
    }
  }

  return (
    <div className=" h-screen w-full  bg-[#000000B3] fixed top-0 left-0 flex items-center justify-center z-10">
      <div className="bg-white  rounded    md:w-2/4" ref={ref}>
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-lg font-bold  ">Final Form</h2>
          <button
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            onClick={() => setFinalFormModalState(false)}
          >
            <X width={15} height={15} />
          </button>
        </div>
        <div className="p-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Icon Name:
              </Label>
              <Input
                id="name"
                {...form.register("name")}
                className="lg:w-1/2 "
                type="text"
                placeholder="Next Js"
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
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="terms"
                checked={form.getValues("public")}
                onCheckedChange={(e: boolean) => form.setValue("public", e)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mind if We share this cool icon with everyone else? Let&apos;s
                make it public!
              </label>
            </div>
            <div className="mt-4">
              {!form.formState.isSubmitting ? (
                <button className={cn(buttonVariants({ size: "sm" }))}>
                  Render Icon
                </button>
              ) : (
                <button
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "flex items-center gap-2"
                  )}
                  disabled={true}
                >
                  Rendering{" "}
                  <Loader2 className="animate-spin" width={15} height={15} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinalIconDetailForm;
