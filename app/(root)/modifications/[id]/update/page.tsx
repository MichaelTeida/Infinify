import React from "react";
import Header from "@/components/shared/Header";
import ModificationForm from "@/components/shared/ModificationForm";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { modificationTypes } from "@/constants";
import { getImageById } from "@/lib/actions/image.actions";

const UpdateModificationPage = async (props: SearchParamProps) => {
  const params = await props.params;

  const { id } = params;

  const authResponse = await auth(); // Await the auth() call

  if (!authResponse?.userId) redirect("/sign-in");

  const user = await getUserById(authResponse.userId);
  const image = await getImageById(id);

  const modification =
    modificationTypes[image.modificationType as ModificationTypeKey];

  return (
    <>
      <Header
        title={modification.title}
        description={modification.description}
      />
      <section className="mt-8">
        <ModificationForm
          action="Update"
          userId={user._id}
          type={image.modificationType as ModificationTypeKey}
          tokenBalance={user.tokenBalance}
          data={image}
          config={image.config}
        />
      </section>
    </>
  );
};

export default UpdateModificationPage;
