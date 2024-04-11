import React from "react";
import Header from "@/components/shared/Header";
import { modificationTypes } from "@/constants";
import ModificationForm from "@/components/shared/ModificationForm";

const AddModificationTypePage = ({ params: { type } }: SearchParamProps) => {
  const modification =
    modificationTypes[type as keyof typeof modificationTypes];

  return (
    <>
      <Header
        title={modification.title}
        description={modification.description}
      />
      <ModificationForm />
    </>
  );
};

export default AddModificationTypePage;
