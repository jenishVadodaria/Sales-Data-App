import { Typography } from "@mui/material";

export const CustomTitle = ({ collapsed }: { collapsed: any }) => {
  return (
    <Typography variant="h6" noWrap>
      {collapsed ? "TM" : "TM Sales"}
    </Typography>
  );
};
