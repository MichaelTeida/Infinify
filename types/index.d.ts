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
  creditBalance: number;
  data?: IImage | null;
  config?: Modifications | null;
};

declare type ModificationTypeKey =
  | "restore"
  | "fill"
  | "remove"
  | "recolor"
  | "removeBackground";
