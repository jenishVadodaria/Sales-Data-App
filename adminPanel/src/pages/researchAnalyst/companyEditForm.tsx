import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  Input,
} from "@mui/material";
import axios from "axios";

interface KeyMember {
  name: string;
  position: string;
  information: string;
  imageUrl: string;
}

interface LatestLaunch {
  date: string;
  description: string;
  source: string;
}

interface ExpansionPlan {
  location: string;
  longitude: string;
  latitude: string;
}

interface ITExpense {
  category: string;
  amount: string;
}

interface Financials {
  year: string;
  revenue: string;
}

interface Risks {
  title: string;
  content: string;
}

interface StrategicFocusAreas {
  title: string;
  content: string;
}

interface peerCompanies {
  _id: string;
  name: string;
}

interface SWOTSection {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface FormData {
  customerExperience: string;
  email: string;
  expansionPlans: ExpansionPlan[];
  itExpenses: ITExpense[];
  loanLossProvision: string;
  name: string;
  challenges: string[];
  financials: Financials[];
  headquarter: string;
  infrastructure: string;
  keyMembers: KeyMember[];
  latestLaunches: LatestLaunch[];
  painPoints: string[];
  problems: string[];
  productDevelopment: string;
  profile: string;
  recentBoardAnnouncement: string[];
  revenuePercentage: string;
  risks: Risks[];
  strategicFocusAreas: StrategicFocusAreas[];
  peerCompanies: peerCompanies[];
  website: string;
  talentManagement: string;
  swot: SWOTSection[];
}

const initialValues: FormData = {
  customerExperience: "",
  email: "",
  expansionPlans: [{ location: "", longitude: "", latitude: "" }],
  itExpenses: [{ category: "", amount: "" }],
  loanLossProvision: "",
  name: "",
  challenges: [""],
  financials: [{ year: "", revenue: "" }],
  headquarter: "",
  infrastructure: "",
  keyMembers: [{ name: "", position: "", information: "", imageUrl: "" }],
  latestLaunches: [{ date: "", description: "", source: "" }],
  painPoints: [""],
  problems: [""],
  productDevelopment: "",
  profile: "",
  recentBoardAnnouncement: [""],
  revenuePercentage: "",
  risks: [{ title: "", content: "" }],
  strategicFocusAreas: [{ title: "", content: "" }],
  peerCompanies: [{ _id: "", name: "" }],
  website: "",
  talentManagement: "",
  swot: [
    {
      strengths: [""],
      weaknesses: [""],
      opportunities: [""],
      threats: [""],
    },
  ],
};

export const CompanyEditForm = ({ paramsId, queryData }: any) => {
  const [formData, setFormData] = useState<FormData>(queryData);
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<any[]>([]);
  //   console.log(paramsId, "+++");
  const API_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;
  const refresh = () => window.location.reload();

  // console.log(queryData, "+++");
  useEffect(() => {
    // Fetch the list of companies from the API
    axios
      .get(API_URL + "/companies/all/names")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  useEffect(() => {
    if (companies.length > 0 && queryData.peerCompanies.length > 0) {
      setSelectedCompanies(
        companies.filter((company) =>
          queryData.peerCompanies.includes(company._id)
        )
      );
    }
  }, [companies, queryData]);

  const handleCompanyChange = (event: React.ChangeEvent<{ value: any[] }>) => {
    const selectedIds = event.target.value as string[]; // Array of selected company IDs
    setSelectedCompanies(
      companies.filter((company) => selectedIds.includes(company._id))
    );
  };

  const handleChange = (
    field: keyof FormData,
    value:
      | string
      | ExpansionPlan[]
      | ITExpense[]
      | string[]
      | Financials[]
      | KeyMember[]
      | LatestLaunch[]
      | number
      | Risks[]
      | StrategicFocusAreas[]
      | peerCompanies[]
      | SWOTSection[]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddExpansionPlan = () => {
    const newExpansionPlans = [
      ...formData.expansionPlans,
      { location: "", longitude: "", latitude: "" },
    ];
    handleChange("expansionPlans", newExpansionPlans);
  };

  const handleExpansionPlanChange = (
    index: number,
    field: keyof ExpansionPlan,
    value: string | number
  ) => {
    const newExpansionPlans = [...formData.expansionPlans];
    // const parsedValue = typeof value === "string" ? parseFloat(value) : value;

    const updatedPlan = { ...newExpansionPlans[index], [field]: value };
    newExpansionPlans[index] = updatedPlan;
    handleChange("expansionPlans", newExpansionPlans);
  };

  const handleAddITExpense = () => {
    const newITExpenses = [
      ...formData.itExpenses,
      { category: "", amount: "" },
    ];
    handleChange("itExpenses", newITExpenses);
  };

  const handleITExpenseChange = (
    index: number,
    field: keyof ITExpense,
    value: string | number
  ) => {
    const newITExpenses = [...formData.itExpenses];
    // const parsedValue = typeof value === "string" ? parseFloat(value) : value;

    const updatedExpense = { ...newITExpenses[index], [field]: value };
    newITExpenses[index] = updatedExpense;
    handleChange("itExpenses", newITExpenses);
  };

  const handleAddFinancials = () => {
    const newFinancials = [...formData.financials, { year: "", revenue: "" }];
    handleChange("financials", newFinancials);
  };

  const handleFinancialsChange = (
    index: number,
    field: keyof Financials,
    value: string | number
  ) => {
    const newFinancials = [...formData.financials];

    const updatedFinancials = { ...newFinancials[index], [field]: value };
    newFinancials[index] = updatedFinancials;
    handleChange("financials", newFinancials);
  };

  const handleAddKeyMember = () => {
    const newKeyMembers = [
      ...formData.keyMembers,
      { name: "", position: "", information: "", imageUrl: "" },
    ];
    handleChange("keyMembers", newKeyMembers);
  };

  const handleKeyMemberChange = (
    index: number,
    field: keyof KeyMember,
    value: string
  ) => {
    const newKeyMembers = [...formData.keyMembers];
    const updatedMember = { ...newKeyMembers[index], [field]: value };
    newKeyMembers[index] = updatedMember;
    handleChange("keyMembers", newKeyMembers);
  };

  const handleAddLatestLaunch = () => {
    const newLatestLaunches = [
      ...formData.latestLaunches,
      { date: "", description: "", source: "" },
    ];
    handleChange("latestLaunches", newLatestLaunches);
  };

  const handleLatestLaunchChange = (
    index: number,
    field: keyof LatestLaunch,
    value: string
  ) => {
    const newLatestLaunches = [...formData.latestLaunches];
    const updatedLaunch = { ...newLatestLaunches[index], [field]: value };
    newLatestLaunches[index] = updatedLaunch;
    handleChange("latestLaunches", newLatestLaunches);
  };

  const handleAddRisks = () => {
    const newRisks = [...formData.risks, { title: "", content: "" }];
    handleChange("risks", newRisks);
  };

  const handleRisksChange = (
    index: number,
    field: keyof Risks,
    value: string
  ) => {
    const newRisks = [...formData.risks];
    const updatedMember = { ...newRisks[index], [field]: value };
    newRisks[index] = updatedMember;
    handleChange("risks", newRisks);
  };

  const handleAddStrategicFocusAreas = () => {
    const newStrategicFocusAreas = [
      ...formData.strategicFocusAreas,
      { title: "", content: "" },
    ];
    handleChange("strategicFocusAreas", newStrategicFocusAreas);
  };

  const handleStrategicFocusAreasChange = (
    index: number,
    field: keyof StrategicFocusAreas,
    value: string
  ) => {
    const newStrategicFocusAreas = [...formData.strategicFocusAreas];
    const updatedMember = { ...newStrategicFocusAreas[index], [field]: value };
    newStrategicFocusAreas[index] = updatedMember;
    handleChange("strategicFocusAreas", newStrategicFocusAreas);
  };
  const handleAddStrength = () => {
    const newStrengths = [...formData.swot[0].strengths, ""];
    handleChange("swot", [{ ...formData.swot[0], strengths: newStrengths }]);
  };

  const handleAddWeakness = () => {
    const newWeaknesses = [...formData.swot[0].weaknesses, ""];
    handleChange("swot", [{ ...formData.swot[0], weaknesses: newWeaknesses }]);
  };

  const handleAddOpportunity = () => {
    const newOpportunities = [...formData.swot[0].opportunities, ""];
    handleChange("swot", [
      { ...formData.swot[0], opportunities: newOpportunities },
    ]);
  };

  const handleAddThreat = () => {
    const newThreats = [...formData.swot[0].threats, ""];
    handleChange("swot", [{ ...formData.swot[0], threats: newThreats }]);
  };

  const handleSwotChange = (
    category: keyof (typeof formData.swot)[0],
    index: number,
    value: string
  ) => {
    const newSwotData = { ...formData.swot[0] };
    newSwotData[category][index] = value;
    handleChange("swot", [{ ...newSwotData }]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const updatedExpansionPlans = formData.expansionPlans.map((plan) => ({
      ...plan,
      longitude: parseFloat(plan.longitude),
      latitude: parseFloat(plan.latitude),
    }));
    const updatedFinancials = formData.financials.map((finance) => ({
      ...finance,
      revenue: parseFloat(finance.revenue),
    }));
    const updatedITExpenses = formData.itExpenses.map((expense) => ({
      ...expense,
      amount: parseFloat(expense.amount),
    }));
    const selectedCompanyIds = selectedCompanies.map((company) => company._id);
    // const updatedSWOTData = {
    //   ...formData.swot,
    // };
    const updatedFormData = {
      ...formData,
      expansionPlans: updatedExpansionPlans,
      financials: updatedFinancials,
      itExpenses: updatedITExpenses,
      peerCompanies: selectedCompanyIds,
      // swot: [updatedSWOTData],
    };

    const finalPayload: any = {
      ...updatedFormData,
      isNew: true,
      isPublished: true,
      isEdited: true,
    };

    delete finalPayload._id;
    delete finalPayload.__v;

    console.log(finalPayload, "+++++++++");

    try {
      const response = await axios.patch(
        API_URL + `/companies/company/${paramsId}`,
        finalPayload
      );
      if (response.status === 200) {
        console.log("Company created successfully:", response.data);
        alert("Company Details Updated Successfully");
        setFormData(queryData);
      } else {
        console.log("Unexpected response:", response.status, response.data);
        alert("Something went wrong, please try again");
      }
      refresh();
      setSelectedCompanies([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("name", e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("email", e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Customer Experience"
            value={formData.customerExperience}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("customerExperience", e.target.value)
            }
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Website"
            value={formData.website}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("website", e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Talent Management"
            value={formData.talentManagement}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("talentManagement", e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "15px" }}>
            Expansion Plan Details
          </Typography>
          {formData.expansionPlans.map((plan, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Location"
                  value={plan.location}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleExpansionPlanChange(index, "location", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Longitude"
                  // type="number"
                  value={plan.longitude}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleExpansionPlanChange(
                      index,
                      "longitude",
                      e.target.value
                    )
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Latitude"
                  // type="number"
                  value={plan.latitude}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleExpansionPlanChange(index, "latitude", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Button
            sx={{ marginTop: "15px" }}
            variant="contained"
            onClick={handleAddExpansionPlan}
          >
            Add More Expansion Plan
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            IT Expense Details
          </Typography>

          {formData.itExpenses.map((expense, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category"
                  value={expense.category}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleITExpenseChange(index, "category", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount"
                  type="text"
                  value={expense.amount}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;

                    handleITExpenseChange(
                      index,
                      "amount",
                      // Number(inputValue)
                      inputValue
                    );
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Button
            sx={{ marginTop: "15px" }}
            variant="contained"
            onClick={handleAddITExpense}
          >
            Add More IT Expense
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Loan Loss Provision"
            value={formData.loanLossProvision}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("loanLossProvision", e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Challenges
          </Typography>
          {formData.challenges.map((challenge, index) => (
            <TextField
              key={index}
              label={`Challenge ${index + 1}`}
              value={challenge}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const newChallenges = [...formData.challenges];
                newChallenges[index] = e.target.value;
                handleChange("challenges", newChallenges);
              }}
              fullWidth
              sx={{ marginBottom: "8px" }}
            />
          ))}
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            onClick={() => {
              const newChallenges = [...formData.challenges, ""];
              handleChange("challenges", newChallenges);
            }}
          >
            Add More Challenge
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Financial Details
          </Typography>

          {formData.financials.map((finance, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Year"
                  value={finance.year}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleFinancialsChange(index, "year", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Revenue"
                  type="text"
                  value={finance.revenue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const inputValue = e.target.value;

                    handleFinancialsChange(
                      index,
                      "revenue",
                      // Number(inputValue)
                      inputValue
                    );
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Button
            sx={{ marginTop: "15px" }}
            variant="contained"
            onClick={handleAddFinancials}
          >
            Add More IT Expense
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Headquarter"
            value={formData.headquarter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("headquarter", e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Infrastructure"
            value={formData.infrastructure}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("infrastructure", e.target.value)
            }
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Key Members
          </Typography>
          {formData.keyMembers.map((member, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Name"
                  value={member.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleKeyMemberChange(index, "name", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Position"
                  value={member.position}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleKeyMemberChange(index, "position", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Information"
                  value={member.information}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleKeyMemberChange(index, "information", e.target.value)
                  }
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Image Url"
                  value={member.imageUrl}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleKeyMemberChange(index, "imageUrl", e.target.value)
                  }
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Button
            sx={{ marginTop: "15px" }}
            variant="contained"
            onClick={handleAddKeyMember}
          >
            Add More Key Member
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Latest Launches
          </Typography>
          {formData.latestLaunches.map((launch, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  value={launch.date}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleLatestLaunchChange(index, "date", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  value={launch.description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleLatestLaunchChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Source"
                  value={launch.source}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleLatestLaunchChange(index, "source", e.target.value)
                  }
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Button
            sx={{ marginTop: "15px" }}
            variant="contained"
            onClick={handleAddLatestLaunch}
          >
            Add More Latest Launch
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Pain Points
          </Typography>
          {formData.painPoints.map((painPoint, index) => (
            <TextField
              key={index}
              label={`Pain Point ${index + 1}`}
              value={painPoint}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const newPainPoints = [...formData.painPoints];
                newPainPoints[index] = e.target.value;
                handleChange("painPoints", newPainPoints);
              }}
              fullWidth
              sx={{ marginBottom: "8px" }}
            />
          ))}
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            onClick={() => {
              const newPainPoints = [...formData.painPoints, ""];
              handleChange("painPoints", newPainPoints);
            }}
          >
            Add More Pain Point
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Problems
          </Typography>
          {formData.problems.map((problem, index) => (
            <TextField
              key={index}
              label={`Problem ${index + 1}`}
              value={problem}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const newProblems = [...formData.problems];
                newProblems[index] = e.target.value;
                handleChange("problems", newProblems);
              }}
              fullWidth
              sx={{ marginBottom: "8px" }}
            />
          ))}
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            onClick={() => {
              const newProblems = [...formData.problems, ""];
              handleChange("problems", newProblems);
            }}
          >
            Add More Problem
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Product Development"
            value={formData.productDevelopment}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("productDevelopment", e.target.value)
            }
            multiline
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Profile"
            value={formData.profile}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("profile", e.target.value)
            }
            multiline
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Recent Board Announcements
          </Typography>
          {formData.recentBoardAnnouncement.map((announcement, index) => (
            <TextField
              key={index}
              label={`Announcement ${index + 1}`}
              value={announcement}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const newAnnouncements = [...formData.recentBoardAnnouncement];
                newAnnouncements[index] = e.target.value;
                handleChange("recentBoardAnnouncement", newAnnouncements);
              }}
              fullWidth
              sx={{ marginBottom: "8px" }}
            />
          ))}
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            onClick={() => {
              const newAnnouncements = [
                ...formData.recentBoardAnnouncement,
                "",
              ];
              handleChange("recentBoardAnnouncement", newAnnouncements);
            }}
          >
            Add More Announcement
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Add Peer Companies
          </Typography>
          <FormControl fullWidth>
            <InputLabel htmlFor="select-multiple-chip">
              Select Companies
            </InputLabel>
            <Select
              multiple
              value={selectedCompanies.map((company) => company._id)}
              onChange={handleCompanyChange as any}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected: any) => (
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {(selected as string[]).map((companyId) => (
                    <Chip
                      key={companyId}
                      label={
                        companies.find((company) => company._id === companyId)
                          ?.name
                      }
                      sx={{ margin: 0.5 }}
                    />
                  ))}
                </Box>
              )}
            >
              {companies.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Revenue Percentage"
            type="string"
            value={formData.revenuePercentage}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("revenuePercentage", e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Risks
          </Typography>
          {formData.risks.map((member, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Title"
                  value={member.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleRisksChange(index, "title", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Content"
                  value={member.content}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleRisksChange(index, "content", e.target.value)
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Button
            sx={{ marginTop: "15px" }}
            variant="contained"
            onClick={handleAddRisks}
          >
            Add More Risks Data
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            Strategic Focus Areas
          </Typography>
          {formData.strategicFocusAreas.map((member, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Title"
                  value={member.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleStrategicFocusAreasChange(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Content"
                  value={member.content}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleStrategicFocusAreasChange(
                      index,
                      "content",
                      e.target.value
                    )
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Button
            sx={{ marginTop: "15px" }}
            variant="contained"
            onClick={handleAddStrategicFocusAreas}
          >
            Add More Strategic Focus Areas Data
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ paddingBottom: "8px" }}>
            SWOT Analysis
          </Typography>
          <div>
            <Typography variant="subtitle1">Strengths:</Typography>
            {formData.swot[0].strengths.map((strength, index) => (
              <TextField
                key={index}
                label={`Strength ${index + 1}`}
                value={strength}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSwotChange("strengths", index, e.target.value)
                }
                fullWidth
                sx={{ marginBottom: "8px" }}
              />
            ))}
            <Button variant="contained" onClick={handleAddStrength}>
              Add More Strength
            </Button>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Typography variant="subtitle1">Weaknesses:</Typography>
            {formData.swot[0].weaknesses.map((weakness, index) => (
              <TextField
                key={index}
                label={`Weakness ${index + 1}`}
                value={weakness}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSwotChange("weaknesses", index, e.target.value)
                }
                fullWidth
                sx={{ marginBottom: "8px" }}
              />
            ))}
            <Button variant="contained" onClick={handleAddWeakness}>
              Add More Weakness
            </Button>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Typography variant="subtitle1">Opportunities</Typography>
            {formData.swot[0].opportunities.map((opportunity, index) => (
              <TextField
                key={index}
                label={`Opportunities ${index + 1}`}
                value={opportunity}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSwotChange("opportunities", index, e.target.value)
                }
                fullWidth
                sx={{ marginBottom: "8px" }}
              />
            ))}
            <Button variant="contained" onClick={handleAddOpportunity}>
              Add More Opportunities
            </Button>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Typography variant="subtitle1">Threats</Typography>
            {formData.swot[0].threats.map((threat, index) => (
              <TextField
                key={index}
                label={`Threat ${index + 1}`}
                value={threat}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSwotChange("threats", index, e.target.value)
                }
                fullWidth
                sx={{ marginBottom: "8px" }}
              />
            ))}
            <Button variant="contained" onClick={handleAddThreat}>
              Add More Threats
            </Button>
          </div>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ marginTop: "30px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Update
        </Button>
      </Box>
    </form>
  );
};
