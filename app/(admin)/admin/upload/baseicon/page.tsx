import Navbar from "@/components/navbar";
import React from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UploadBaseIconAdmin = () => {
  return (
    <div className=" flex items-center justify-center h-full">
      <div className="border py-6 px-4 shadow-sm w-1/3 rounded-md">
        <h1 className="text-lg font-bold text-center">Upload Base Icon</h1>
        <div className="mt-6">
          <form action="" className="flex flex-col gap-3">
            <div>
              <Label htmlFor="picture">Icon:</Label>
              <Input id="picture" type="file" />
            </div>
            <div>
              <Label htmlFor="picture">Name:</Label>
              <Input id="picture" type="text" placeholder="Default windows" />
            </div>
            <div>
              <Label htmlFor="picture">Platform:</Label>
              <RadioGroup
                className="ml-2 text-foreground/60 mt-1"
                defaultValue="comfortable"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Windows</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">MacOS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Button className="mt-1">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadBaseIconAdmin;
