/* eslint-disable no-unused-vars */

declare type FormUrlQueryParams = {
  searchParams: URLSearchParams;
  key: string;
  value: string | null | number;
};

declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

declare type SearchParamProps = {
  params: { id: string; type: ModificationTypeKey };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type ModificationFormProps = {
  action: "Add" | "Update";
  userId: string;
  type: ModificationTypeKey;
  tokenBalance: number;
  data?: ImageModel | null;
  config?: Modifications | null;
};

declare type Modifications = {
  upscale?: boolean;
  fillBackground?: boolean;
  remove?: {
    prompt: string;
    removeShadow?: boolean;
    multiple?: boolean;
  };
  recolor?: {
    prompt?: string;
    to: string;
    multiple?: boolean;
  };
  removeBackground?: boolean;
};

declare type ModificationTypeKey =
  | "upscale"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";

declare type ModifiedImageProps = {
  image: any;
  title: string;
  type: string;
  isModifying: boolean;
  setIsModifying?: React.Dispatch<React.SetStateAction<boolean>>;
  modificationConfig: Transformations | null;
  hasDownload?: boolean;
};

declare type AddImageParams = {
  image: {
    publicId: string;
    modificationType: string;
    title: string;
    width: number;
    height: number;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
    config: any;
    modificationUrl: string;
    secureUrl: string;
  };
  path: string;
  userId: string;
};

declare type UpdateImageParams = {
  image: {
    _id: string;
    publicId: string;
    modificationType: string;
    title: string;
    width: number;
    height: number;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
    config: any;
    modificationUrl: string;
    secureUrl: string;
  };
  path: string;
  userId: string;
};
