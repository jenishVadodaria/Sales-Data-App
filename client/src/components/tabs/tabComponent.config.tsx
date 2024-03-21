// import FinancialTab from "../../Pages/ControlPanel/FinancialTab";
// import CompanyTrendsTab from "../../Pages/ControlPanel/CompanyTrends/CompanyTrendsTab.component";

import CompanyTrends from "../../pages/companyTrends/companyTrends";
import FinanceTab from "../../pages/finance/financeTab";
import GeneralPage from "../../pages/general";

export const TabData = [
  {
    label: "General",
    value: "general",
    desc: (companyDetails: any, selectedData: any) => {
      return (
        <div>
          <GeneralPage
            challenges={companyDetails?.challenges}
            email={companyDetails?.email}
            headquarter={companyDetails?.headquarter}
            keyMembers={companyDetails?.keyMembers}
            latestLaunches={companyDetails?.latestLaunches}
            painPoints={companyDetails?.painPoints}
            problems={companyDetails?.problems}
            profile={companyDetails?.profile}
            recentBoardAnnouncement={companyDetails?.recentBoardAnnouncement}
            risks={companyDetails?.risks}
            strategicFocusAreas={companyDetails?.strategicFocusAreas}
            swot={companyDetails?.swot}
            website={companyDetails?.website}
            selectedData={selectedData}
          />
        </div>
      );
    },
  },
  {
    label: "Financial",
    value: "financial",
    // desc: (company: any) => <FinancialTab currentCompany={company} />,
    desc: (companyDetails: any, selectedData: any) => (
      <FinanceTab
        itExpenses={companyDetails?.itExpenses}
        peerCompanies={companyDetails?.peerCompanies}
        financials={companyDetails?.financials}
        name={companyDetails?.name}
        currentCompanyId={companyDetails?._id}
        selectedData={selectedData}
      />
    ),
  },

  {
    label: "Company Trends",
    value: "companyTrends",
    // desc: (company: any) => <CompanyTrendsTab currentCompany={company} />
    desc: (companyDetails: any, selectedData: any) => (
      <CompanyTrends
        talentManagement={companyDetails?.talentManagement}
        infrastructure={companyDetails?.infrastructure}
        productDevelopment={companyDetails?.productDevelopment}
        customerExperience={companyDetails?.customerExperience}
        expansionPlans={companyDetails?.expansionPlans}
        selectedData={selectedData}
      />
    ),
  },
];
