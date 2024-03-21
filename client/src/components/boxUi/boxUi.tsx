import { ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";
import styled from "styled-components";

interface BoxUiProps {
  children: ReactNode;
  className?: string;
  hasShadow?: boolean;
  sx?: BoxProps;
}

const StyledBoxUi = styled(Box)`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  display: block;
`;

export const BoxUi = ({ children, className, hasShadow, sx }: BoxUiProps) => {
  let boxShadow = {};
  if (hasShadow) {
    boxShadow = {
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
    };
  }
  return (
    <StyledBoxUi className={className} sx={{ ...boxShadow, ...sx }}>
      {children}
    </StyledBoxUi>
  );
};

BoxUi.defaultProps = {
  className: "",
  hasShadow: false,
};
