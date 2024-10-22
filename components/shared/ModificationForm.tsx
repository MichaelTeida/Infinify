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
  tokenFee,
} from "@/constants";
import { CustomField } from "@/components/shared/CustomField";
import { useEffect, useState, useTransition } from "react";
import { element } from "prop-types";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { updateTokens } from "@/lib/actions/user.actions";
import MediaUploader from "@/components/shared/MediaUploader";
import ModifiedImage from "@/components/shared/ModifiedImage";
import { getCldImageUrl } from "next-cloudinary";
import { addImage, updateImage } from "@/lib/actions/image.actions";
import { useRouter } from "next/navigation";
import { LackingTokensModal } from "@/components/shared/LackingTokensModal";

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
  const [isPending, startModification] = useTransition();
  const router = useRouter();

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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (data || image) {
      const modificationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...modificationConfig,
      });

      const imageData = {
        title: values.title,
        modificationType: type,
        publicId: image?.publicId,
        modificationUrl: modificationUrl,
        secureUrl: image?.secureUrl,
        config: modificationConfig,
        width: image?.width,
        height: image?.height,
        aspectRatio: values.aspectRatio,
        color: values.color,
        prompt: values.prompt,
      };
      if (action === "Add") {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: "/",
          });
          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`/modifications/${newImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (action === "Update") {
        try {
          const updatedImage = await updateImage({
            image: { ...imageData, _id: data._id },
            userId,
            path: `/modification/${data._id}`,
          });
          if (updatedImage) {
            router.push(`/modifications/${updatedImage._id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    setIsSubmitting(false);
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

  const onModifyHandler = async () => {
    setIsModifying(true);

    setModificationConfig(
      deepMergeObjects(newModification, modificationConfig),
    );

    setNewModification(null);

    startModification(async () => {
      await updateTokens(userId, tokenFee);
    });
  };

  useEffect(() => {
    if (image && (type === "upscale" || type === "removeBackground")) {
      setNewModification(modificationType.config);
    }
  }, [image, modificationType.config, type]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {tokenBalance < Math.abs(tokenFee) && <LackingTokensModal />}
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

        <div className="media-upload-field">
          <CustomField
            className="flex size-full flex-col"
            control={form.control}
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
            name="publicId"
          />
          <ModifiedImage
            image={image}
            title={form.getValues().title}
            type={type}
            isModifying={isModifying}
            setIsModifying={setIsModifying}
            modificationConfig={modificationConfig}
          />
        </div>

        <div className="flex flex-col md:flex-row md:justify-end gap-4">
          <Button
            type="button"
            className="submit-button-mobile md:submit-button"
            disabled={isModifying || newModification === null}
            onClick={onModifyHandler}
          >
            {isModifying ? "Modifying..." : "Apply modification"}
            <KeyboardDoubleArrowRightIcon />
          </Button>

          <Button
            type="submit"
            className="submit-button-mobile md:submit-button"
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
