import { usePermissions } from "@refinedev/core";
import { ThemedSiderV2 } from "@refinedev/mui";
import { MenuItem } from "@mui/material";
import { CustomTitle } from "./customTitle";

export const CustomSider = () => {
  const { data: permission }: any = usePermissions();

  return (
    <ThemedSiderV2
      Title={({ collapsed }) => <CustomTitle collapsed={collapsed} />}
      render={({ items, logout, collapsed }) => {
        // console.log(items, "++");

        const filteredItems = items.map((item) => {
          // console.log(item, "itemss");

          if (item.key === "/users" && permission?.role === "admin") {
            return item;
          }
          if (item.key === "/qa" && permission?.role === "qa") {
            return item;
          }
          if (
            item.key === "/companies" &&
            permission?.role === "research_analyst"
          ) {
            return item;
          }
          if (item.key === "/qaCompanies" && permission?.role === "qa") {
            return item;
          }
          if (item.key === "/feedback" && permission?.role === "qa") {
            return item;
          }
          return null;
        });

        return (
          <>
            {filteredItems}
            {/* {items} */}
            {logout}
          </>
        );
      }}
    />
  );
};
