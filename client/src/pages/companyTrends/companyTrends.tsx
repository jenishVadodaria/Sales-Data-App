import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import ContainerCard from "../../components/containerCard/containerCard";
import InvestmentPlans from "./investmentPlans/investmentPlans";
import PowerOfOne from "./powerOfOne/powerOfOne";
import ExpansionPlans from "./expansionPlans/expansionPlans";
import { Box } from "@mui/material";
import PeopleIntelligence from "./peopleIntelligence/peopleIntelligence";
// import ExpansionPlans from "./ExpansionPlans/ExpansionPlans.component";
// import PeopleIntelligence from "./peopleIntelligence/peopleIntelligence";
// import PowerOfOne from "./PowerOfOne/PowerofOne.component";

export default function CompanyTrends({
  talentManagement,
  infrastructure,
  productDevelopment,
  customerExperience,
  expansionPlans,
  selectedData,
}: any) {
  const [loading, setLoading] = useState(false);

  const [trendsData, setTrendsData] = useState({});

  //   const getTrendsData = async () => {
  //     if (!!currentCompany) {
  //       setLoading(true);
  //       await axios
  //         .get(API_BASE_URL + TECH_M_ENDPOINTS.TRENDS(currentCompany))
  //         .then((res) => {
  //           setTrendsData(res.data.data[0]);
  //           console.log("comapny data:", res.data.data[0]);
  //         })
  //         .catch(() => {
  //           toast.error("Something went wrong");
  //         })
  //         .finally(() => {
  //           setLoading(false);
  //         });
  //     }
  //   };

  //   useEffect(() => {
  //     getTrendsData();
  //   }, [currentCompany]);

  const dummyLayoffData = [
    {
      set: [
        { month: "January", value: "10" },
        { month: "February", value: "15" },
        { month: "March", value: "5" },
        { month: "April", value: "8" },
        { month: "May", value: "12" },
        { month: "June", value: "6" },
      ],
    },
  ];

  const dummyHiringData = [
    { year: "2015", value: "50" },
    { year: "2016", value: "70" },
    { year: "2017", value: "90" },
    { year: "2018", value: "80" },
    { year: "2019", value: "120" },
    { year: "2020", value: "100" },
    { year: "2021", value: "110" },
  ];

  const dummyDataforPowerofOne = {
    growth: {
      "Revenue Growth": {
        "annual data dec 2021": [
          {
            "Cash Flow Benefits (Millions – CHF)": "99.99",
            "Improvement (1 % or 1 Day)": 1,
          },
        ],
        "latest twelve months - Sep 2022": [
          {
            "Cash Flow Benefits (Millions – CHF)": "124.27",
            "Improvement (1 % or 1 Day)": 1,
          },
        ],
      },
    },
    profitability: {
      "Cost of Goods Sold": {
        "annual data dec 2021": [
          {
            "Cash Flow Benefits (Millions – CHF)": "345.72",
            "Improvement (1 % or 1 Day)": -1,
          },
        ],
        "latest twelve months - Sep 2022": [
          {
            "Cash Flow Benefits (Millions – CHF)": "331.34",
            "Improvement (1 % or 1 Day)": -1,
          },
        ],
      },
      "Selling, General & Admin. Exp.": {
        "annual data dec 2021": [
          {
            "Cash Flow Benefits (Millions – CHF)": "191.64",
            "Improvement (1 % or 1 Day)": -1,
          },
        ],
        "latest twelve months - Sep 2022": [
          {
            "Cash Flow Benefits (Millions – CHF)": "202.61",
            "Improvement (1 % or 1 Day)": -1,
          },
        ],
      },
      "Research & Development": {
        "annual data dec 2021": [
          {
            "Cash Flow Benefits (Millions – CHF)": "0",
            "Improvement (1 % or 1 Day)": -1,
          },
        ],
        "latest twelve months - Sep 2022": [
          {
            "Cash Flow Benefits (Millions – CHF)": "0",
            "Improvement (1 % or 1 Day)": -1,
          },
        ],
      },
      "Operating Income Margin": {
        "annual data dec 2021": [
          {
            "Cash Flow Benefits (Millions – CHF)": "801.18",
            "Improvement (1 % or 1 Day)": 1,
          },
        ],
        "latest twelve months - Sep 2022": [
          {
            "Cash Flow Benefits (Millions – CHF)": "800.83",
            "Improvement (1 % or 1 Day)": 1,
          },
        ],
      },
    },
    "capital utilization": {
      "Days In Inventory": {
        "annual data dec 2021": [
          {
            "Cash Flow Benefits (Millions – CHF)": "104.19",
            "Improvement (1 % or 1 Day)": 0,
          },
        ],
        "latest twelve months - Sep 2022": [
          {
            "Cash Flow Benefits (Millions – CHF)": "99.86",
            "Improvement (1 % or 1 Day)": 0,
          },
        ],
      },
      "Days Sales Outstanding": {
        "annual data dec 2021": [
          {
            "Cash Flow Benefits (Millions – CHF)": "86.69",
            "Improvement (1 % or 1 Day)": 0,
          },
        ],
        "latest twelve months - Sep 2022": [
          {
            "Cash Flow Benefits (Millions – CHF)": "89.78",
            "Improvement (1 % or 1 Day)": 0,
          },
        ],
      },
      "Day Payables Outstanding": {
        "annual data dec 2021": [
          {
            "Cash Flow Benefits (Millions – CHF)": "133.16",
            "Improvement (1 % or 1 Day)": 0,
          },
        ],
        "latest twelve months - Sep 2022": [
          {
            "Cash Flow Benefits (Millions – CHF)": "137.02",
            "Improvement (1 % or 1 Day)": 0,
          },
        ],
      },
      "Net Working Capital Days": {
        "annual data dec 2021": [
          {
            "Cash Flow Benefits (Millions – CHF)": "57.71",
            "Improvement (1 % or 1 Day)": 0,
          },
        ],
        "latest twelve months - Sep 2022": [
          {
            "Cash Flow Benefits (Millions – CHF)": "53.62",
            "Improvement (1 % or 1 Day)": 0,
          },
        ],
      },
    },
  };

  return loading ? (
    <ContainerCard isLoading />
  ) : (
    <div>
      {/* <InvestmentPlans keyInvestments={trendsData ?? []} /> */}
      <InvestmentPlans
        talentManagement={talentManagement}
        infrastructure={infrastructure}
        productDevelopment={productDevelopment}
        customerExperience={customerExperience}
        selectedData={selectedData}
      />
      <div style={{ marginTop: "85px" }}>
        {/* <PowerOfOne data={trendsData?.powerOfOne ?? {}} /> */}
        {/* <PowerOfOne data={dummyDataforPowerofOne} /> */}
      </div>
      <div style={{ marginTop: "85px" }}>
        <ExpansionPlans
          expansions={expansionPlans}
          selectedData={selectedData}
        />
      </div>
      <Box height={"30px"}></Box>

      {/* <PeopleIntelligence
        data={{
          layoffs: dummyLayoffData,
          hirings: dummyHiringData,
        }}
        company="Example Company"
      /> */}
    </div>
  );
}
