"use client";

import React, { useRef, useState, useTransition } from "react";
import { tokenFeeChat } from "@/constants";
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
import ChatMessages from "@/components/shared/ChatMessages";
import { updateTokens } from "@/lib/actions/user.actions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export const formSchema = z.object({
  message: z.string().min(1).max(1000), // Min. 1 character
  model: z.string(),
  stream: z.boolean().optional(),
});

const Chat = ({
  userId,
  tokenBalance,
}: {
  userId: string;
  tokenBalance: any;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const responseRef = useRef("");
  const [, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      model: "google/gemini-2.0-flash-lite-preview-02-05:free",
      stream: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setMessages((prev) => [...prev, { role: "user", content: values.message }]);
    responseRef.current = "";
    form.resetField("message");

    try {
      const response = await fetch(`/api/webhooks/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData.error || "Unknown error"}`,
        );
      }

      startTransition(async () => {
        await updateTokens(userId, tokenFeeChat);
        toast({
          title: "Message sent successfully",
          description: `${tokenFeeChat} token was used`,
          duration: 2000,
          className: cn(
            "top-4 right-4 flex fixed max-w-[300px] sm:max-w-[420px] sm:top-4 sm:right-7 media-success-toast",
          ),
        });
      });

      if (values.stream) {
        const reader = response.body?.getReader();
        if (!reader) throw new Error("ReadableStream not supported");

        const decoder = new TextDecoder();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          responseRef.current += chunk;
          setMessages((prev) => {
            const updatedMessages = [...prev];
            if (updatedMessages[updatedMessages.length - 1]?.role === "chat") {
              updatedMessages[updatedMessages.length - 1].content =
                responseRef.current;
            } else {
              updatedMessages.push({
                role: "chat",
                content: responseRef.current,
              });
            }
            return [...updatedMessages];
          });
        }
      } else {
        const data = await response.json();
        console.log("API response: ", data);

        setMessages((prev) => [
          ...prev,
          { role: "chat", content: data.response },
        ]);
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col flex-grow min-h-0"
        >
          {tokenBalance < Math.abs(tokenFeeChat) && <LackingTokensModal />}
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

          <ChatMessages messages={messages} />

          <CustomField
            control={form.control}
            name="message"
            formLabel="Message"
            className="w-full"
            render={({ field }) => (
              <div className="form-chat-container-input">
                <Input
                  {...field}
                  placeholder="Type your message..."
                  autoComplete="off"
                  className="form-chat-container-input_field"
                />
                <Button
                  className={"form-chat-container-input_button"}
                  disabled={isSubmitting}
                >
                  Run
                </Button>
              </div>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default Chat;
