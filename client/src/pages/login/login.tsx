import React, { useState } from "react";
import { CommonAuthTheme } from "../../components/authTheme/commonAuthTheme";
import "../../components/authTheme/auththeme.css";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // await login(email, password);
    // navigate("/dashboard");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      // console.log(error, "errorrr");
      toast.error(
        error.message ||
          "Failed to log in. Please check your email and password."
      );
    }
  };

  return (
    <CommonAuthTheme>
      <form onSubmit={onSubmit}>
        <div className="mb-2">
          <label htmlFor="email" className="form-label black-color">
            Email
          </label>
          <div className="input-group">
            <input
              type="email"
              className={`form-control `}
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"johndoe@gmail.com"}
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="form-label black-color">
            Password
          </label>
          <div className="input-group">
            <input
              type={"password"}
              className={`form-control `}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8 characters minimum"
              required
            />
            <div className="input-group-append" role="button"></div>
          </div>
        </div>
        <div className="text-end mb-2 text-muted">
          {/* <Link to="/forgot-password"> */}
          <small>Forgot Password ?</small>
          {/* </Link> */}
        </div>

        <div className="mb-2">
          <button type="submit" className="btn btn-sm w-100 btn-primary">
            Sign in
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </CommonAuthTheme>
  );
};
