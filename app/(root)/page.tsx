import React from "react";
import { UserButton } from "@clerk/nextjs";

const Homepage = () => {
  return (
    <div>
      <p>Homepage</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Homepage;
