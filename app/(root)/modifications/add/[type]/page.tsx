import React from "react";
import Header from "@/components/shared/Header";
import { modificationTypes } from "@/constants";
import ModificationForm from "@/components/shared/ModificationForm";
import { auth } from "@clerk/nextjs";

const AddModificationTypePage = ({ params: { type } }: SearchParamProps) => {
  const modification =
    modificationTypes[type as keyof typeof modificationTypes];
  const { userId } = auth;

  return (
    <>
      <Header
        title={modification.title}
        description={modification.description}
      />
      <ModificationForm action="Add" userId={} />
    </>
  );
};

export default AddModificationTypePage;
