import React from "react";
import Header from "@/components/shared/Header";
import Chat from "@/components/shared/Chat";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

const ChatPage = async () => {
  const authResponse = await auth(); // Await the auth() call
  if (!authResponse?.userId) redirect("/sign-in");
  const user = await getUserById(authResponse.userId);

  return (
    <>
      <Header
        title={"Chat AI"}
        description={
          "Engage in interactive conversations powered by artificial intelligence."
        }
      />
      <section className="mt-8 flex flex-col flex-grow">
        <Chat tokenBalance={user.tokenBalance} />
      </section>
    </>
  );
};

export default ChatPage;
