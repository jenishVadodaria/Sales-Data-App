import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { toast } from "react-toastify";

import {
  convertAPIResponseToBarChartData,
  convertData,
  getRandomColor,
} from "../../utils/graphUtils";
import ContainerCard from "../../components/containerCard/containerCard";
import { Box, Checkbox } from "@mui/material";
import { appConstants } from "../../utils/app.constants";
import { ifSelected, selectData } from "../../utils/dataSelection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinanceTab = ({
  itExpenses,
  peerCompanies,
  financials,
  name,
  currentCompanyId,
  selectedData,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [peerCompaniesData, setPeerCompaniesData] = useState<any>();
  const [currentCompanyFinancials, setCurrentCompanyFinancials] =
    useState<any>();
  const [currentCompanyName, setCurrentCompanyName] = useState<any>();
  const [CompanyId, setCompanyId] = useState<any>("");

  const LOCAL_STORAGE_KEY = "selectedCompany";

  const [finData, setFinData] = useState({});

  //   const getFinancialData = async (company) => {
  //     console.log("company", company);
  //     setLoading(true);
  //     await axios
  //       .get(API_BASE_URL + TECH_M_ENDPOINTS.FINANCIAL(company))
  //       .then((res) => {
  //         setFinData(res.data.data);
  //         console.log(res.data.data.peerAnalysis.data["Dec-21"]);
  //       })
  //       .catch(() => {
  //         toast.error("Something went wrong");
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   };

  useEffect(() => {
    setCompanyId(currentCompanyId);
  }, [currentCompanyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const storedCompany = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (currentCompanyId) {
          const response = await axios.get(
            `${appConstants.baseApiUrl}/companies/published/financials/${currentCompanyId}`
          );
          if (response.data) {
            setPeerCompaniesData(response.data.peerCompanies);
            setCurrentCompanyFinancials(response.data.financials);
            setCurrentCompanyName(response.data.name);
            // console.log(response.data, "peercompaniesss");
          }
        }
        // else {
        //   const defaultCompanyResponse = await axios.get(
        //     `${appConstants.baseApiUrl}/companies/financials/64ae75b630cde70c6db401a3`
        //   );
        //   setPeerCompaniesData(defaultCompanyResponse.data.peerCompanies);
        //   setCurrentCompanyFinancials(defaultCompanyResponse.data.financials);
        //   setCurrentCompanyName(defaultCompanyResponse.data.name);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [peerCompanies, currentCompanyId, CompanyId]);

  const accountRevenueData: any = {
    data: [
      {
        title: currentCompanyName ? currentCompanyName : "",
        set: currentCompanyFinancials
          ? currentCompanyFinancials.map((financial: any) => ({
              year: financial?.year,
              value: financial?.revenue,
            }))
          : [],
      },
      ...(peerCompaniesData
        ? peerCompaniesData.map((companyData: any) => ({
            title: companyData.name,
            set: companyData.financials.map((financial: any) => ({
              year: financial.year,
              value: financial.revenue,
            })),
          }))
        : []),
    ],
  };

  // console.log(accountRevenueData, "accountRevenuee");

  const revenueCompChartConfig = {
    borderRadius: 30,
    // width: 11,
    plugins: {
      legend: {
        height: "40px",
        labels: {
          color: "black",
          font: {
            size: 12,
          },
          borderRadius: 30,
          height: "110px",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Years",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue in (%)",
        },
      },
    },
  };

  const acctRevChartConfig = {
    plugins: {
      legend: {
        labels: {
          color: "black",
          font: {
            size: 12,
          },
          borderRadius: 30,
          height: "40px",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Years",
        },
      },
      y: {
        title: {
          display: true,
          text:
            // currentCompany === "airbus"
            //   ? "Revenue in EUR Millions"
            //   :
            "Total Revenue ($ Billions)",
        },
      },
    },
  };

  const peerChartConfig = {
    plugins: {
      legend: {
        labels: {
          color: "black",
          font: {
            size: 12,
          },
          borderRadius: 30,
          height: "40px",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Years",
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage Profitability",
        },
      },
    },
  };

  const itExpChartConfig = {
    plugins: {
      legend: {
        labels: {
          color: "black",
          font: {
            size: 12,
          },
          borderRadius: 30,
          // height: "40px",
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text:
            // currentCompany === "airbus"
            //   ? "Value in Mil-EUR"
            //   :
            // "Value in US$ Billions",
            "Number (Billions)",
        },
      },
    },
  };

  const dummyData = {
    revenue: {
      data: [
        {
          title: "Company A",
          set: [
            { year: 2020, value: 100 },
            { year: 2021, value: 150 },
            { year: 2022, value: 200 },
          ],
        },
        {
          title: "Company B",
          set: [
            { year: 2020, value: 120 },
            { year: 2021, value: 180 },
            { year: 2022, value: 220 },
          ],
        },
      ],
    },
    account: {
      data: [
        {
          title: "Company A",
          set: [
            { year: 2020, value: 80 },
            { year: 2021, value: 90 },
            { year: 2022, value: 100 },
          ],
        },
        {
          title: "Company B",
          set: [
            { year: 2020, value: 70 },
            { year: 2021, value: 85 },
            { year: 2022, value: 110 },
          ],
        },
      ],
    },
    itExpenditure: {
      data: [
        {
          title: "Company A",
          set: [
            { year: 2020, value: 50 },
            { year: 2021, value: 60 },
            { year: 2022, value: 70 },
          ],
        },
        {
          title: "Company B",
          set: [
            { year: 2020, value: 40 },
            { year: 2021, value: 55 },
            { year: 2022, value: 75 },
          ],
        },
      ],
    },
    peerAnalysis: {
      data: {
        CompanyA: {
          growth: [
            {
              title: "Revenue",
              set: [
                { year: 2020, value: 100 },
                { year: 2021, value: 120 },
                { year: 2022, value: 140 },
              ],
            },
            {
              title: "Profit",
              set: [
                { year: 2020, value: 30 },
                { year: 2021, value: 40 },
                { year: 2022, value: 50 },
              ],
            },
          ],
        },
        CompanyB: {
          growth: [
            {
              title: "Revenue",
              set: [
                { year: 2020, value: 120 },
                { year: 2021, value: 140 },
                { year: 2022, value: 160 },
              ],
            },
            {
              title: "Profit",
              set: [
                { year: 2020, value: 40 },
                { year: 2021, value: 50 },
                { year: 2022, value: 60 },
              ],
            },
          ],
        },
      },
    },
  };

  const formattedDataITExpensesData = {
    labels: itExpenses && itExpenses.map((entry: any) => entry?.category),
    datasets: [
      {
        label: "Amount in USD",
        data:
          itExpenses &&
          itExpenses.map((entry: any) => parseFloat(entry.amount)),
        fill: false,
        borderColor: "#F98600",
        tension: 0.1,
      },
    ],
  };

  const formatDataAccountRevenue = (data: any) => {
    const formattedData = {
      data: [] as any[],
    };

    if (Array.isArray(data)) {
      data.forEach((item: any) => {
        const companyData = {
          title: item.name,
          set: item.financials.map((financial: any) => ({
            year: financial.year,
            value: financial.revenue,
          })),
        };
        formattedData.data.push(companyData);
      });
    }

    return formattedData;
  };

  const formatDataRevenueComparison = (data: any) => {
    const formattedData = {
      data: [] as any[],
    };

    if (Array.isArray(data)) {
      data.forEach((item: any) => {
        const companyData = {
          title: item.name,
          set: item.financials.map(
            (financial: any, index: number, array: any[]) => {
              if (index >= 0) {
                const previousValue = parseFloat(array[index + 1]?.revenue);
                const currentValue = parseFloat(financial?.revenue);

                if (!isNaN(previousValue) && !isNaN(currentValue)) {
                  const percentageChange =
                    (currentValue / previousValue) * 100 - 100;
                  return {
                    year: financial.year,
                    value: percentageChange?.toFixed(2),
                  };
                } else {
                  return {
                    year: financial.year,
                    value: null,
                  };
                }
              } else {
                return {
                  year: financial.year,
                  value: null,
                };
              }
            }
          ),
        };
        formattedData.data.push(companyData);
      });
    }

    return formattedData;
  };

  const formatDataRevenueComparison2 = (
    peerCompaniesData: any,
    currentCompanyFinancials: any
  ) => {
    const formattedData = {
      data: [] as any[],
    };

    if (Array.isArray(peerCompaniesData)) {
      peerCompaniesData.forEach((item: any) => {
        const companyData = {
          title: item.name,
          set: item.financials.map(
            (financial: any, index: number, array: any[]) => {
              if (index >= 0) {
                const previousValue = parseFloat(array[index + 1]?.revenue);
                const currentValue = parseFloat(financial?.revenue);

                if (!isNaN(previousValue) && !isNaN(currentValue)) {
                  const percentageChange =
                    (currentValue / previousValue) * 100 - 100;
                  return {
                    year: financial.year,
                    value: percentageChange?.toFixed(2),
                  };
                } else {
                  return {
                    year: financial.year,
                    value: null,
                  };
                }
              } else {
                return {
                  year: financial.year,
                  value: null,
                };
              }
            }
          ),
        };
        formattedData.data.push(companyData);
      });
    }

    if (Array.isArray(currentCompanyFinancials)) {
      const currentCompanyData = {
        title: currentCompanyName ? currentCompanyName : "",
        set: currentCompanyFinancials.map(
          (financial: any, index: number, array: any[]) => {
            if (index >= 0) {
              const previousValue = parseFloat(array[index + 1]?.revenue);
              const currentValue = parseFloat(financial?.revenue);

              if (!isNaN(previousValue) && !isNaN(currentValue)) {
                const percentageChange =
                  (currentValue / previousValue) * 100 - 100;
                return {
                  year: financial.year,
                  value: percentageChange?.toFixed(2),
                };
              } else {
                return {
                  year: financial.year,
                  value: null,
                };
              }
            } else {
              return {
                year: financial.year,
                value: null,
              };
            }
          }
        ),
      };
      formattedData.data.push(currentCompanyData);
    }

    return formattedData;
  };

  // console.log(
  //   formatDataRevenueComparison2(peerCompaniesData, currentCompanyFinancials),
  //   "formatDataRevenueComparison2+++"
  // );

  // console.log(peerCompaniesData, "dataaaa");

  // console.log(formatDataRevenueComparison(peerCompaniesData), "percentttt");

  // console.log(formatDataAccountRevenue(peerCompaniesData), "formatt");

  const [isChecked, setIsChecked] = useState(false);
  const [isRevenueChecked, setIsRevenueChecked] = useState(false);
  const [isItChecked, setIsItChecked] = useState(false);

  useEffect(() => {
    setIsChecked(ifSelected("financials"));
    setIsRevenueChecked(ifSelected("financials2"));
    setIsItChecked(ifSelected("itExpenses"));
  }, [selectedData]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 mx-2 mb-3">
        <ContainerCard
          title={"Revenue Comparison"}
          isLoading={loading}
          actionComponent={
            <Checkbox
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(selectData("financials", financials));
              }}
            />
          }
        >
          <Bar
            data={convertAPIResponseToBarChartData(
              formatDataRevenueComparison2(
                peerCompaniesData,
                currentCompanyFinancials
              )
            )}
            options={revenueCompChartConfig}
          />
        </ContainerCard>
        <ContainerCard
          title={"Actual Revenue"}
          isLoading={loading}
          actionComponent={
            <Checkbox
              checked={isRevenueChecked}
              onChange={(e) => {
                setIsRevenueChecked(selectData("financials2", financials));
              }}
            />
          }
        >
          {/* {accountRevenueData && ( */}
          <Line
            data={convertAPIResponseToBarChartData(
              // formatDataAccountRevenue(peerCompaniesData)
              accountRevenueData
            )}
            options={acctRevChartConfig}
          />
          {/* )} */}
        </ContainerCard>
        <ContainerCard
          title={"IT expenditure"}
          className="col-span-2"
          isLoading={loading}
          actionComponent={
            <Checkbox
              checked={isItChecked}
              onChange={(e) => {
                setIsItChecked(selectData("itExpenses", itExpenses));
              }}
            />
          }
        >
          <Line data={formattedDataITExpensesData} options={itExpChartConfig} />
        </ContainerCard>
        {/* <ContainerCard
          title={"Profitability Peer Comparison"}
          isLoading={loading}
        >
          <Line
            data={convertData(dummyData.peerAnalysis?.data)}
            options={peerChartConfig}
          />
        </ContainerCard> */}
      </div>
      <Box height={"30px"}></Box>
    </>
  );
};

export default FinanceTab;
