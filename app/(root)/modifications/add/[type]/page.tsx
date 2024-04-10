import React from "react";
import Header from "@/components/shared/Header";
import { modificationTypes } from "@/constants";

const AddModificationTypePage = ({ params: { type } }: SearchParamProps) => {
  const modification =
    modificationTypes[type as keyof typeof modificationTypes];

  return (
    <Header title={modification.title} description={modification.description} />
  );
};

export default AddModificationTypePage;
