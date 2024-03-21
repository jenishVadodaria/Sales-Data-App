import { useEffect, useState } from "react";
import icon from "../../../assets/BrandPocket.png";
import styles from "./riskAssociated.module.scss";
import { ifSelected, selectData } from "../../../utils/dataSelection";
import { Checkbox } from "@mui/material";

const RiskAssociated = ({ risks, selectedData }: any) => {
  const [isChecked, setIsChecked] = useState(false);
  const dataTest = {
    risks: [
      {
        title: "Title1",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident molestias doloremque in esse dolor, error aliquid aliquam nostrum cum quaerat ipsam. Ut perspiciatis iusto dignissimos architecto neque quo, qui aliquid.",
      },
      {
        title: "Title2",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident molestias doloremque in esse dolor, error aliquid aliquam nostrum cum quaerat ipsam. Ut perspiciatis iusto dignissimos architecto neque quo, qui aliquid.",
      },
      {
        title: "Title3",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident molestias doloremque in esse dolor, error aliquid aliquam nostrum cum quaerat ipsam. Ut perspiciatis iusto dignissimos architecto neque quo, qui aliquid.",
      },
      {
        title: "Title4",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident molestias doloremque in esse dolor, error aliquid aliquam nostrum cum quaerat ipsam. Ut perspiciatis iusto dignissimos architecto neque quo, qui aliquid.",
      },
      {
        title: "Title5",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident molestias doloremque in esse dolor, error aliquid aliquam nostrum cum quaerat ipsam. Ut perspiciatis iusto dignissimos architecto neque quo, qui aliquid.",
      },
    ],
  };

  useEffect(() => {
    setIsChecked(ifSelected("risks"));
  }, [selectedData]);

  return (
    <>
      <div className="my-5">
        <div className="text-start mx-3 mt-5 px-2 flex align-items-center my-3">
          <h2 className="text-dark fw-bold fs-3 ">
            Risk Associated with Company
          </h2>
          <Checkbox
            checked={isChecked}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            onChange={(e) => {
              setIsChecked(selectData("risks", risks));
            }}
          />
        </div>
        <div className={styles.riskAssociatedBorder + " mx-3 my-2"}>
          <ul>
            {risks &&
              risks.map((item: any, index: any) => (
                <li
                  key={index}
                  className="my-4 mx-2 grid grid-flow-col auto-cols-max align-items-start"
                >
                  <div className="grid w-12 float-left">
                    <img src={icon} style={{ width: "25px" }} />
                  </div>
                  <div className="mx-3 w-full">
                    <h3 className=" fw-bold fs-5 text-dark">{item.title}</h3>
                    <p
                      className="my-2 text-secondary fs-6 lh-base"
                      style={{ width: "800px" }}
                    >
                      {item.content}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RiskAssociated;
