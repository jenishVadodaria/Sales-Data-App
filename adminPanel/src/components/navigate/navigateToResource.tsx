import { useResource, useGetToPath } from "@refinedev/core";
import jwtDecode from "jwt-decode";
import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type NavigateToResourceProps = PropsWithChildren<{
  resource?: string;

  meta?: Record<string, unknown>;
}>;

export const NavigateToResource: React.FC<NavigateToResourceProps> = ({
  resource: resourceProp,

  meta,
}) => {
  const token = localStorage.getItem("refine-auth");
  const { resources } = useResource();
  const getToPath = useGetToPath();
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const userRole = decodedToken?.role;
    console.log(userRole, "+");

    let roleResource;

    if (userRole === "admin") {
      roleResource = resources.find((r) => r.name === "users");
    } else if (userRole === "qa") {
      roleResource = resources.find((r) => r.name === "qa");
    }

    if (roleResource) {
      const path = getToPath({
        resource: roleResource,
        action: "list",
        meta,
      });

      if (path) {
        return <Navigate to={path} />;
      }

      console.warn("No resource is found to navigate to.");
      return null;
    } else {
      console.warn("No resource is found to navigate to.");
      return null;
    }
  } else {
    console.warn("Something went wrong!");
    return null;
  }
};

// import { useResource, useGetToPath } from "@refinedev/core";
// import React, { PropsWithChildren } from "react";
// import { Navigate } from "react-router-dom";

// type NavigateToResourceProps = PropsWithChildren<{
//   resource?: string;
//   meta?: Record<string, unknown>;
// }>;

// export const NavigateToResource: React.FC<NavigateToResourceProps> = ({
//   resource: resourceProp,
//   meta,
// }) => {
//   const getToPath = useGetToPath();
//   const { resource, resources } = useResource(resourceProp);
//   console.log(resources, "++");

//   const toResource = resource || resources.find((r) => r.list);

//   if (toResource) {
//     const path = getToPath({
//       resource: toResource,
//       action: "list",
//       meta,
//     });

//     if (path) {
//       return <Navigate to={path} />;
//     }

//     console.warn("No resource is found to navigate to.");
//     return null;
//   } else {
//     console.warn("No resource is found to navigate to.");
//     return null;
//   }
// };
