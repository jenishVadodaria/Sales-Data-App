import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Dashboard } from "./pages/dashboard/dashboard";
import { useAuthContext } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/protectedRoute";
import "./App.css";
import { Layout } from "./components/layout/layout";
import { appConstants } from "./utils/app.constants";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuthenticated, hasRole } = useAuthContext();
  // console.log(isAuthenticated(), "++", hasRole(appConstants.userRole));

  return (
    <BrowserRouter>
      {/* {isAuthenticated() ? <Dashboard /> : <Login />} */}
      <Routes>
        {isAuthenticated() === true && hasRole(appConstants.userRole) ? (
          <Route path="/" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
