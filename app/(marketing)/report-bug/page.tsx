"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { baseUrl } from "@/lib/axiosConfig";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must have 2 char",
  }),
  email: z.string().email("Email must be valid"),
  message: z.string().min(20, "Minimum 20 char is required"),
});

const ReportBug = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = toast("Submitting bug report");
    axios
      .post(`${baseUrl}/bugs`, values)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Bug report submitted", { id });
          form.reset();
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to created bug report", { id });
      });
  }

  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="text-lg font-bold">Report Bug</h1>
      <p className="text-sm text-primary/50">
        Facing any kind problem in website feel free to report here.
      </p>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full gap-1.5">
              <Label
                className={`${
                  form.formState.errors.message ? "text-red-900" : ""
                }`}
                htmlFor="message-2"
              >
                Your Message
              </Label>
              <Textarea
                placeholder="Type your message here."
                id="message-2"
                {...form.register("message")}
              />
              {form.formState.errors.message ? (
                <p className="text-sm text-red-900">
                  {form.formState.errors.message.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Your message will be copied to the support team.
                </p>
              )}
            </div>
            <Button disabled={form.formState.isSubmitting} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ReportBug;
