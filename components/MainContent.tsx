import React from "react";
import Container from "./Container";

const MainContent = ({
  children,
  isBoxsed,
  className,
}: {
  children: React.ReactNode;
  isBoxsed?: boolean;
  className?: string;
}) => {
  return isBoxsed ? (
    <Container className={className}>{children}</Container>
  ) : (
    <div className={className}>{children}</div>
  );
};

export default MainContent;
