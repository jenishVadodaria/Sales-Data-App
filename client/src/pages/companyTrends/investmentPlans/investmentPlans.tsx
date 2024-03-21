import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { ifSelected, selectData } from "../../../utils/dataSelection";

const InvestmentPlans = ({
  talentManagement,
  infrastructure,
  productDevelopment,
  customerExperience,
  selectedData,
}: any) => {
  const keyInvestmentsData = [
    {
      title: "Talent Management",
      description: talentManagement ? talentManagement : "",
    },
    {
      title: "Infrastructure",
      description: infrastructure ? infrastructure : "",
    },
    {
      title: "Product Development",
      description: productDevelopment ? productDevelopment : "",
    },
    {
      title: "Customer Experience",
      description: customerExperience ? customerExperience : "",
    },
  ];

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const isTalentManagement = ifSelected("talentManagement");
    const isInfrastructure = ifSelected("infrastructure");
    const isProductDevelopment = ifSelected("productDevelopment");
    const isCustomerExperience = ifSelected("customerExperience");
    setIsChecked(
      isTalentManagement &&
        isInfrastructure &&
        isProductDevelopment &&
        isCustomerExperience
    );
  }, [selectedData]);

  return (
    <div className="text-center mx-auto">
      <div className="my-5 flex align-items-center justify-content-center">
        <b style={{ fontSize: "25px", fontWeight: "bold" }}>
          Key investment plans
        </b>

        <Checkbox
          checked={isChecked}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
          onChange={(e) => {
            const isTalentManagement = selectData(
              "talentManagement",
              talentManagement
            );
            const isInfrastructure = selectData(
              "infrastructure",
              infrastructure
            );
            const isProductDevelopment = selectData(
              "productDevelopment",
              productDevelopment
            );
            const isCustomerExperience = selectData(
              "customerExperience",
              customerExperience
            );
            setIsChecked(
              isTalentManagement &&
                isInfrastructure &&
                isProductDevelopment &&
                isCustomerExperience
            );
          }}
        />
      </div>
      <div className="row mx-3">
        {keyInvestmentsData.map((el, i) => (
          <div
            key={i}
            className="col"
            style={{ width: "245px", marginRight: "44px" }}
          >
            <div
              className="circle mb-3 mx-auto"
              style={{
                backgroundColor: "rgb(79, 119, 204)",
                borderRadius: "75%",
                width: "43px",
                height: "43px",
                padding: "12px",
                color: "white",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {i + 1}
            </div>
            <div className="mb-3" style={{ fontSize: "18px", fontWeight: 600 }}>
              {el.title.substring(0, 60)}
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "#667085",
                textAlign: "center",
                lineHeight: "21px",
              }}
            >
              {el.description.substring(0, 250)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentPlans;
