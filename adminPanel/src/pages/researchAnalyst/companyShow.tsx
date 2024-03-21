import { ListButton, Show } from "@refinedev/mui";
import { Typography, Grid, Box, CircularProgress } from "@mui/material";
import { useShow } from "@refinedev/core";
import React, { useEffect, useState } from "react";
import axios from "axios";

type KeyMember = {
  name: string;
  position: string;
  information: string;
};

type SWOTAnalysis = {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
};

type CompanyDetails = {
  _id: string;
  name: string;
  profile: string;
  website: string;
  headquarter: string;
  email: string;
  keyMembers: KeyMember[];
  swot: SWOTAnalysis[];
  recentBoardAnnouncement: string[];
  problems: string[];
  painPoints: string[];
  challenges: string[];
  latestLaunches: {
    date: string;
    description: string;
    source: string;
  }[];
  strategicFocusAreas: {
    title: string;
    content: string;
  }[];
  risks: {
    title: string;
    content: string;
  }[];
  revenuePercentage: number;
  talentManagement: string;
  infrastructure: string;
  productDevelopment: string;
  customerExperience: string;
  loanLossProvision: string;
  expansionPlans: {
    location: string;
    longitude: number;
    latitude: number;
  }[];
  financials: {
    year: number;
    revenue: number;
  }[];
  itExpenses: {
    category: string;
    amount: number;
  }[];
  peerCompanies: string[];
};

export const CompanyShow = () => {
  const { queryResult } = useShow<CompanyDetails>();
  const [companyNamesMap, setCompanyNamesMap] = useState<any>({});
  const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL + "/companies/all/names")
      .then((response) => {
        const namesMap: any = {};
        response.data.forEach((company: any) => {
          namesMap[company._id] = company.name;
        });
        setCompanyNamesMap(namesMap);
      })
      .catch((error) => {
        console.error("Error fetching company names:", error);
      });
  }, []);

  useEffect(() => {
    if (queryResult?.data?.data) {
      setLoading(false);
    }
  }, [queryResult?.data?.data]);

  const companyDetails = queryResult?.data?.data;

  return (
    <Show
      title={<Typography variant="h5">Company Details</Typography>}
      canDelete={false}
      headerButtons={({ listButtonProps }) => (
        <>
          {listButtonProps && (
            <ListButton {...listButtonProps} meta={{ foo: "bar" }} />
          )}
        </>
      )}
    >
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {companyDetails && (
        <div>
          <Typography variant="h6">Company Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>Name: {companyDetails?.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Website: {companyDetails?.website}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                Headquarter: {companyDetails?.headquarter}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Email: {companyDetails?.email}</Typography>
            </Grid>
          </Grid>
          <br />
          <Typography variant="h6">Key Members</Typography>

          {companyDetails?.keyMembers?.map((member: any, index: any) => (
            <div key={index}>
              <Typography>Name: {member.name}</Typography>
              <Typography>Position: {member.position}</Typography>
              <Typography>Information: {member.information}</Typography>
              <Typography>Image-Url: {member.imageUrl}</Typography>
              {member.imageUrl && (
                <>
                  <Box height={"10px"}></Box>

                  <img
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "100px",
                    }}
                    src={member.imageUrl}
                    alt={member.name}
                  />
                  <Box height={"20px"}></Box>
                </>
              )}
              <br />
            </div>
          ))}
          <br />
          <Typography variant="h6">SWOT Analysis</Typography>
          <Typography variant="h6">Strengths:</Typography>
          <ul>
            {companyDetails?.swot[0]?.strengths.map(
              (strength: any, index: any) => (
                <li key={index}>{strength}</li>
              )
            )}
          </ul>
          <Typography variant="h6">Weaknesses:</Typography>
          <ul>
            {companyDetails?.swot[0]?.weaknesses.map(
              (weakness: any, index: any) => (
                <li key={index}>{weakness}</li>
              )
            )}
          </ul>
          <Typography variant="h6">Opportunities:</Typography>
          <ul>
            {companyDetails?.swot[0].opportunities.map(
              (opportunity: any, index: any) => (
                <li key={index}>{opportunity}</li>
              )
            )}
          </ul>
          <Typography variant="h6">Threats:</Typography>
          <ul>
            {companyDetails?.swot[0].threats.map((threat: any, index: any) => (
              <li key={index}>{threat}</li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">Recent Board Announcements</Typography>
          <ul>
            {companyDetails?.recentBoardAnnouncement.map(
              (announcement, index) => (
                <li key={index}>{announcement}</li>
              )
            )}
          </ul>
          <br />
          <Typography variant="h6">Problems</Typography>
          <ul>
            {companyDetails?.problems.map((problem, index) => (
              <li key={index}>{problem}</li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">Pain Points</Typography>
          <ul>
            {companyDetails?.painPoints.map((painPoint, index) => (
              <li key={index}>{painPoint}</li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">Challenges</Typography>
          <ul>
            {companyDetails?.challenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">Latest Launches</Typography>
          <ul>
            {companyDetails?.latestLaunches.map((launch, index) => (
              <li key={index}>
                <Typography>Date: {launch.date}</Typography>
                <Typography>Description: {launch.description}</Typography>
                <Typography>Source: {launch.source}</Typography>
              </li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">Strategic Focus Areas</Typography>
          <ul>
            {companyDetails?.strategicFocusAreas.map((area, index) => (
              <li key={index}>
                <Typography>Title: {area.title}</Typography>
                <Typography>Content: {area.content}</Typography>
                <br />
              </li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">Risks</Typography>
          <ul>
            {companyDetails?.risks.map((risk, index) => (
              <li key={index}>
                <Typography>Title: {risk.title}</Typography>
                <Typography>Content: {risk.content}</Typography>
                <br />
              </li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">
            Revenue Percentage: {companyDetails?.revenuePercentage}
          </Typography>
          <br />
          <Typography variant="h6">
            Talent Management: {companyDetails?.talentManagement}
          </Typography>
          <br />
          <Typography variant="h6">
            Infrastructure: {companyDetails?.infrastructure}
          </Typography>
          <br />
          <Typography variant="h6">
            Product Development: {companyDetails?.productDevelopment}
          </Typography>
          <br />
          <Typography variant="h6">
            Customer Experience: {companyDetails?.customerExperience}
          </Typography>
          <br />
          <Typography variant="h6">
            Loan Loss Provision: {companyDetails?.loanLossProvision}
          </Typography>
          <br />
          <Typography variant="h6">Expansion Plans</Typography>
          <ul>
            {companyDetails?.expansionPlans.map((plan, index) => (
              <li key={index}>
                Location: {plan.location}, Latitude: {plan.latitude}, Longitude:{" "}
                {plan.longitude}
              </li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">Financials (In Billions)</Typography>
          <ul>
            {companyDetails?.financials.map((financial, index) => (
              <li key={index}>
                Year: {financial.year}, Revenue: {financial.revenue}
              </li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">IT Expenses</Typography>
          <ul>
            {companyDetails?.itExpenses.map((expense, index) => (
              <li key={index}>
                <Typography>Category: {expense.category}</Typography>
                <Typography> Amount: {expense.amount}</Typography>
                <br />
              </li>
            ))}
          </ul>
          <br />
          <Typography variant="h6">Peer Companies</Typography>
          <ul>
            {companyDetails?.peerCompanies.map((company: any, index) => (
              <li key={index}>{companyNamesMap[company]}</li>
            ))}
          </ul>
        </div>
      )}
    </Show>
  );
};
