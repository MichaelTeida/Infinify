import React from "react";
import Header from "@/components/shared/Header";
import { modificationTypes } from "@/constants";
import ModificationForm from "@/components/shared/ModificationForm";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

const AddModificationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth();
  const modification =
    modificationTypes[type as keyof typeof modificationTypes];

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title={modification.title}
        description={modification.description}
      />
      <section className="mt-8">
        <ModificationForm
          action="Add"
          userId={user._id}
          type={modification.type as ModificationTypeKey}
          tokenBalance={user.tokenBalance}
        />
      </section>
    </>
  );
};

export default AddModificationTypePage;
