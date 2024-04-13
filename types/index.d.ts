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
  restore?: boolean;
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
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";
