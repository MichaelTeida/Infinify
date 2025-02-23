"use client";

import React from "react";
import { tokenFee } from "@/constants";
import { LackingTokensModal } from "@/components/shared/LackingTokensModal";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomField } from "@/components/shared/CustomField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const formSchema = z.object({
  message: z.string().min(1).max(1000), // Min. 1 character
  model: z.string().optional(),
});

const Chat = ({ tokenBalance }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      model: "",
    },
  });

  const onSubmit = () => {};

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {tokenBalance < Math.abs(tokenFee) && <LackingTokensModal />}
          <CustomField
            control={form.control}
            name="model"
            formLabel="Model select"
            className="w-full"
            render={({ field }) => (
              <Select onValueChange={(value) => {}} value={field.value}>
                <SelectTrigger className="form-select_field">
                  <SelectValue placeholder="Choose model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={"1"} value={"testValue1"}>
                    testChoice1
                  </SelectItem>
                  <SelectItem key={"2"} value={"testValue2"}>
                    testChoice2
                  </SelectItem>
                  <SelectItem key={"3"} value={"testValue3"}>
                    testChoice3
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <div className="border p-4 mt-4">Messages here (placeholder)</div>

          <CustomField
            control={form.control}
            name="message"
            formLabel="Message"
            className="w-full"
            render={({ field }) => (
              <div className={"flex"}>
                <Input {...field} className="form-input_field rounded-xs" />
                <Button className={"submit-button"}> Send </Button>
              </div>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default Chat;
