import { AuthPage } from "@refinedev/mui";

import { useLogin } from "@refinedev/core";
import "../../components/authTheme/auththeme.css";
import { Link } from "react-router-dom";
import { CommonAuthTheme } from "../../components/authTheme/commonAuthTheme";

type LoginVariables = {
  email: string;
  password: string;
};

export const Login = () => {
  const { mutate: login } = useLogin<LoginVariables>();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    login(
      { email, password },
      {
        onSuccess: (data) => {
          if (!data.success) {
            alert("Invalid Credentials");
            // throw new Error("Error from here");
          }
        },
      }
    );
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
              placeholder={"johndoe@gmail.com"}
              // ref={}
              // onChange={handleChange}
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
              // type={showPassword ? 'text' : 'password'}
              type={"password"}
              className={`form-control `}
              id="password"
              name="password"
              placeholder="8 characters minimum"
              // ref={passwordInput}
              // onChange={handleChange}
              required
            />
            <div className="input-group-append" role="button">
              {/* <div className="input-group-text">
                          <span onClick={() => setShowPassword(!showPassword)}>
													{showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
												</span>
                        </div> */}
            </div>
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
    </CommonAuthTheme>
  );
};
