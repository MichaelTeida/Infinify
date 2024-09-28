"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import {
  aspectRatioOptions,
  defaultValues,
  modificationTypes,
} from "@/constants";
import { CustomField } from "@/components/shared/CustomField";
import { useState } from "react";
import { element } from "prop-types";
import { AspectRatioKey, debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export const formSchema = z.object({
  title: z.string().min(2).max(50),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

const ModificationForm = ({
  action,
  userId,
  type,
  tokenBalance,
  data = null,
  config = null,
}: ModificationFormProps) => {
  const modificationType = modificationTypes[type];
  const [image, setImage] = useState(data);
  const [newModification, setNewModification] = useState<Modifications | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [modificationConfig, setModificationConfig] = useState(config);

  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void,
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));
    setNewModification(modificationType.config);

    return onChangeField(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void,
  ) => {
    debounce(() => {
      setNewModification((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
      return onChangeField(value);
    }, 1000);
  };

  const onModifyHandler = async () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image"
          className="w-full"
          render={({ field }) => (
            <Input {...field} className="form-input_field" />
          )}
        />

        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value) =>
                  onSelectFieldHandler(value, field.onChange)
                }
              >
                <SelectTrigger className="form-select_field">
                  <SelectValue placeholder="Choose size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((element) => (
                    <SelectItem key={element} value={element}>
                      {aspectRatioOptions[element as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === "remove" ? "Remove the object" : "Recolor the object"
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input_field"
                  onChange={(e) => {
                    onInputChangeHandler(
                      "prompt",
                      e.target.value,
                      type,
                      field.onChange,
                    );
                  }}
                />
              )}
            />

            {type === "recolor" && (
              <CustomField
                control={form.control}
                formLabel="Replacement Color"
                name="color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input_field"
                    onChange={(e) => {
                      onInputChangeHandler(
                        "color",
                        e.target.value,
                        "recolor",
                        field.onChange,
                      );
                    }}
                  />
                )}
              />
            )}
          </div>
        )}
        <div className="flex flex-col md:flex-row md:justify-end gap-4">
          <Button
            type="button"
            className="submit-button-mobile md:submit-button capitalize"
            disabled={isModifying || newModification === null}
            onClick={onModifyHandler}
          >
            {isModifying ? "Modifying..." : "Apply Modification"}
            <KeyboardDoubleArrowRightIcon />
          </Button>

          <Button
            type="submit"
            className="submit-button-mobile md:submit-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save image"}
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ModificationForm;
