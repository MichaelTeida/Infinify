import React from "react";

const Header = ({ title, subTitle }: { title: string; subTitle?: string }) => {
  return (
    <>
      <h2 className="page-title">{title}</h2>
      {subTitle && <p className="mt-4">{subTitle}</p>}
    </>
  );
};

export default Header;
