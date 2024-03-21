import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
// import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { notificationProvider } from "./providers/notificationProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import { Authenticated as Protected } from "./components/authenticated/authenticated";
import { UserList, UserEdit, UserShow } from "./pages/users";
import { userDataProvider } from "./providers/userDataProvider";
import { qaDataProvider } from "./providers/qaDataProvider";
import { FeedbackList, QACompanyShow, QaList } from "./pages/qa";
import { UserRole } from "./components/authenticated/authenticatedEnum";
import { CustomSider } from "./components/sider";
import { useEffect, useState } from "react";
import RedirectToUser from "./components/redirectToUser/redirectToUser";
import { researchAnalystDataProvider } from "./providers/researchAnalystDataProvider";
import { CompanyEdit, CompanyList, CompanyShow } from "./pages/researchAnalyst";
import { CreateCompany } from "./pages/createCompany/createCompany";
import { qaFeedbackDataProvider } from "./providers/qaFeedbackDataProvider";
// import { NavigateToResource } from "./components/navigate/navigateToResource";

function App() {
  const token = localStorage.getItem("refine-auth");
  const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;
  const QA_API_URL = import.meta.env.VITE_BACKEND_API_BASE_UR_QA as string;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken?.role, "+");
  }

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          {/* <RefineSnackbarProvider> */}
          <Refine
            dataProvider={{
              default: userDataProvider(API_URL),
              QA: qaDataProvider(QA_API_URL),
              Analyst: researchAnalystDataProvider(API_URL),
              QAFeedback: qaFeedbackDataProvider(API_URL),
            }}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={[
              {
                name: "users",
                list: "/users/list",
                // create: "/users/user/create",
                edit: "/users/user/update/:id",
                show: "/users/user/:id",
                meta: {
                  canDelete: true,
                },
              },

              {
                name: "qaCompanies",
                list: "/v1/companies/all",
                show: "/v1/companies/:id",
                meta: {
                  label: "QA Company List",
                  dataProviderName: "QA",
                },
              },

              {
                name: "companies",
                list: "/companies/all",
                // create: "/users/user/create",
                edit: "/companies/company/:id",
                show: "/companies/:id",
                meta: {
                  label: "Research Analyst",
                  dataProviderName: "Analyst",

                  canDelete: true,
                },
              },

              {
                name: "feedback",
                list: "/feedback/all",

                meta: {
                  label: "Feedbacks",
                  dataProviderName: "QAFeedback",

                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    {/* <Authenticated redirectOnFail="/login"> */}
                    <ThemedLayoutV2
                      Sider={() => <CustomSider />}
                      Header={() => <Header sticky />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  path="/users"
                  element={
                    <Protected
                      role={[UserRole.Admin]}
                      fallback={<>Not Authorized!</>}
                    >
                      <Outlet />
                    </Protected>
                  }
                >
                  <Route path="list" index element={<UserList />} />
                  <Route path="user/update/:id" element={<UserEdit />} />
                  <Route path="user/:id" element={<UserShow />} />
                </Route>

                <Route
                  path="/register"
                  element={
                    <Protected
                      role={[UserRole.Admin]}
                      fallback={<>Not Authorized!</>}
                    >
                      <Register />
                    </Protected>
                  }
                />

                <Route
                  element={
                    <Protected
                      role={[UserRole.QA]}
                      fallback={<>Not Authorized!</>}
                    >
                      <Outlet />
                    </Protected>
                  }
                >
                  <Route path="v1/companies/all" element={<QaList />} />
                  <Route path="v1/companies/:id" element={<QACompanyShow />} />
                </Route>

                <Route
                  path="/companies"
                  element={
                    <Protected
                      role={[UserRole.ResearchAnalyst]}
                      fallback={<>Not Authorized!</>}
                    >
                      <Outlet />
                    </Protected>
                  }
                >
                  <Route path="all" index element={<CompanyList />} />
                  <Route path=":id" element={<CompanyShow />} />
                  <Route path="company/:id" element={<CompanyEdit />} />
                  {/* <Route path="user/update/:id" element={<UserEdit />} />
                  <Route path="user/:id" element={<UserShow />} /> */}
                </Route>

                <Route
                  path="/feedback"
                  element={
                    <Protected
                      role={[UserRole.QA]}
                      fallback={<>Not Authorized!</>}
                    >
                      <Outlet />
                    </Protected>
                  }
                >
                  <Route path="all" index element={<FeedbackList />} />
                </Route>

                <Route
                  path="/createCompany"
                  element={
                    <Protected
                      role={[UserRole.ResearchAnalyst]}
                      fallback={<>Not Authorized!</>}
                    >
                      <CreateCompany />
                    </Protected>
                  }
                />

                <Route path="*" element={<ErrorComponent />} />
                <Route path="/" element={<RedirectToUser />} />
              </Route>
              <Route
              // element={
              //   <Authenticated fallback={<Outlet />}>
              //     {/* <NavigateToResource /> */}
              //   </Authenticated>
              // }
              >
                <Route path="/login" element={<Login />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          {/* </RefineSnackbarProvider> */}
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
