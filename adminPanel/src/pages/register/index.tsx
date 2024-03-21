import { useRegister } from "@refinedev/core";
import { AuthPage } from "@refinedev/mui";
import { CommonAuthTheme } from "../../components/authTheme/commonAuthTheme";
import "../../components/authTheme/auththeme.css";
import { useNotification } from "@refinedev/core";
import { Authenticated } from "../../components/authenticated/authenticated";
import { useRef, useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
} from "@mui/material";
import axios from "axios";

type RegisterVariables = {
  name: string;
  email: string;
  password: string;
  role: string;
  following: string[];
};

export const Register = () => {
  const { mutate: register } = useRegister<RegisterVariables>();
  const { open, close } = useNotification();
  const formRef = useRef<HTMLFormElement>(null);
  // const classes = useStyles();
  const [companies, setCompanies] = useState<any[]>([]);
  const [following, setFollowing] = useState([]);
  const [checkRole, setCheckRole] = useState<string>("");
  const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;


  useEffect(() => {
    axios
      .get(API_URL + "/companies/all/names/published")
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error("Error fetching companies:", error));
  }, []);

  const handleCheckRoleSelected = (event: any) => {
    setCheckRole(event.target.value);
  };

  const handleCompanySelect = (event: any) => {
    const selectedIds = event.target.value;
    setFollowing(selectedIds);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    register(
      { name, email, password, role, following },
      {
        onSuccess: (data) => {
          console.log(data, "++--==");

          if (!data.success) {
            alert("Something went wrong");
            throw new Error("Error from here");
          } else {
            console.log("Registered!");
            alert("User Registered Successfully");
            open?.({
              type: "success",
              message: "Success",
              description: "Registered",
              key: "register-user",
            });
            formRef.current?.reset();
            setFollowing([]);
            setCheckRole("");
            // close?.("register-user");
          }
        },
      }
    );
    // console.log(name, email, password, role, "++");
  };

  return (
    <CommonAuthTheme>
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label black-color">
            Name
          </label>
          <div className="input-group">
            <input
              type="text"
              className={`form-control`}
              id="name"
              name="name"
              placeholder={"John Doe"}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label black-color">
            Email
          </label>
          <div className="input-group">
            <input
              type="email"
              className={`form-control`}
              id="email"
              name="email"
              placeholder={"johndoe@gmail.com"}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label black-color">
            Password
          </label>
          <div className="input-group">
            <input
              // type={showPassword ? 'text' : 'password'}
              type={"password"}
              className={`form-control`}
              id="password"
              name="password"
              placeholder="8 characters minimum"
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

        <div className="mb-3">
          <label className="form-label black-color">Role</label>
          <div className="input-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="inlineRadio2"
                value="research_analyst"
                defaultChecked
                onChange={handleCheckRoleSelected}
              />
              <label
                className="form-check-label black-color"
                htmlFor="inlineRadio2"
              >
                Research Analyst
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="inlineRadio1"
                value="user"
                onChange={handleCheckRoleSelected}
              />
              <label
                className="form-check-label black-color"
                htmlFor="inlineRadio1"
              >
                User
              </label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="inlineRadio3"
                value="qa"
                onChange={handleCheckRoleSelected}
              />
              <label
                className="form-check-label black-color"
                htmlFor="inlineRadio3"
              >
                QA
              </label>
            </div>
          </div>
        </div>

        {checkRole === "user" && (
          <div className="mb-3">
            <label
              htmlFor="AddCompaniesToFollow"
              className="form-label black-color"
            >
              Add Companies to Follow:
            </label>
            <div className="w-100">
              <FormControl
                style={{
                  minWidth: 200,
                  maxWidth: 200,
                  backgroundColor: "#ffffff",
                  border: "2px solid black",
                }}
              >
                <InputLabel style={{ color: "black" }} id="companies-label">
                  Select Companies
                </InputLabel>
                <Select
                  labelId="companies-label"
                  id="companies"
                  multiple
                  value={following}
                  onChange={handleCompanySelect}
                  inputProps={{
                    name: "companies",
                    id: "companies",
                  }}
                  style={{ color: "black" }}
                  // renderValue={(selected: any) => (
                  //   <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  //     {(selected as string[]).map((companyId) => (
                  //       <Chip
                  //         key={companyId}
                  //         label={
                  //           companies.find(
                  //             (company: any) => company._id === companyId
                  //           )?.name
                  //         }
                  //         sx={{ margin: 0.5 }}
                  //       />
                  //     ))}
                  //   </Box>
                  // )}
                >
                  {companies.map((company: any) => (
                    <MenuItem key={company._id} value={company._id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        )}

        <div className="mt-4">
          <button type="submit" className="btn btn-sm w-100 btn-primary">
            Register
          </button>
        </div>
      </form>
    </CommonAuthTheme>
  );
};
