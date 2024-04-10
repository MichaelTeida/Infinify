import React from "react";

const Header = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <>
      <h2 className="page-title">{title}</h2>
      {description && <p className="mt-4">{description}</p>}
    </>
  );
};

export default Header;
