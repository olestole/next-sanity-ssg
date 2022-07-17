import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="h-screen w-screen flex">{children}</div>;
};

export default Layout;
