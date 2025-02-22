import React from "react";
import Header from "@/components/shared/Header";
import { modificationTypes } from "@/constants";
import ModificationForm from "@/components/shared/ModificationForm";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const AddModificationTypePage = async (props: SearchParamProps) => {
  const params = await props.params;

  const { type } = params;

  const authResponse = await auth(); // Await the auth() call

  const modification =
    modificationTypes[type as keyof typeof modificationTypes];

  if (!authResponse?.userId) redirect("/sign-in");

  const user = await getUserById(authResponse.userId);

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
