import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import StarIcon from "@mui/icons-material/Star";
import { BoxUi } from "../boxUi/boxUi";
import styled from "styled-components";
import axios from "axios";
import { appConstants } from "../../utils/app.constants";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const StyledText = styled.p`
  font-style: normal;
  font-family: Inter;
  font-weight: 500;
  font-size: 18px;
  line-height: 35px;
  letter-spacing: 0.01em;
  margin: 0;
`;

const StarButton = styled(StarIcon)`
  color: gray;
  cursor: pointer;

  &.followed {
    color: #ffd700;
  }
`;

export default function CompanySelect({
  onCompanyChange,
  isFollowing,
  handleFollow,
  currentCompanyId,
}: any) {
  const [open, setOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackDescription, setFeedbackDescription] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  // useState({
  //   label: "Select a Company",
  //   value: "",
  // });
  const { user } = useAuthContext();

  useEffect(() => {
    fetchCompanyNames();
    setIsFollowed(isFollowing);
  }, [isFollowing]);

  const fetchCompanyNames = async () => {
    try {
      const response = await axios.get(
        `${appConstants.baseApiUrl}/companies/all/names/published`
      );
      const { data } = response;
      const options = data.map((company: any) => ({
        value: company._id,
        label: company.name,
      }));
      setCompanyOptions(options);
      // console.log(data, "+++");
    } catch (error) {
      console.error("Error fetching company names:", error);
    }
  };
  // console.log(isFollowed, "+++followwww");

  const handleOpen = () => {
    setFeedbackTitle("");
    setFeedbackDescription("");
    setOpen(true);
  };

  const handleOpenNotifications = () => {
    setOpenNotifications(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseNotification = () => {
    setOpenNotifications(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!feedbackTitle || !feedbackDescription) {
      toast.error("Please fill in both the feedback title and description.");
      return;
    }
    const data = {
      title: feedbackTitle,
      description: feedbackDescription,
      companyId: currentCompanyId,
    };
    try {
      const response = await axios.post(
        `${appConstants.baseApiUrl}/companies/feedback`,
        data
      );

      // console.log(response.data, "Response from API");

      setOpen(false);
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred while submitting feedback.");
    }
  };

  const handleCompanyChange = (selectedOption: any) => {
    setSelectedCompany(selectedOption);
    onCompanyChange(selectedOption);
    const companyData = localStorage.getItem("companyData");
    if (companyData) {
      localStorage.removeItem("companyData");
    }
  };

  const colourOptions = [
    { value: "t-mobile", label: "T-Mobile", color: "#FFC400" },
    { value: "airbus", label: "Airbus", color: "#00B8D9" },
    { value: "credit-suisse", label: "Credit Suisse", color: "#0052CC" },
    {
      value: "Mahindra",
      label: "Mahindra",
      color: "#5243AA",
      isDisabled: true,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        <Select
          className="basic-single w-25 pt-1 z-20 text-base"
          classNamePrefix="select"
          defaultValue={selectedCompany}
          isClearable
          isSearchable
          name="name"
          options={companyOptions}
          onChange={handleCompanyChange}
        />
        <Box sx={{ paddingLeft: "2rem" }}>
          <StarButton
            className={isFollowed ? "followed" : ""}
            onClick={handleFollow}
            fontSize="large"
          />
        </Box>
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "190px",
        }}
      >
        <CircleNotificationsIcon
          color="primary"
          fontSize="large"
          onClick={handleOpenNotifications}
          sx={{
            cursor: "pointer",
          }}
        />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Feedback
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: { borderRadius: "15px" } }}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>Add Feedback</Box>
              <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
            </Box>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Feedback Title / KPI Name"
              fullWidth
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
            />
            <TextField
              multiline
              margin="dense"
              label="Feedback Description"
              fullWidth
              value={feedbackDescription}
              onChange={(e) => setFeedbackDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Close</Button> */}
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openNotifications}
          onClose={handleCloseNotification}
          PaperProps={{ sx: { borderRadius: "15px" } }}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Updated company details</DialogTitle>
          <DialogContent>
            <Box sx={{ p: 2 }}>
              {/* {companies.map((company) => (
                <Box
                  key={company.id}
                  sx={{
                    paddingBottom: "1.5rem",
                  }}
                >
                  <BoxUi
                    hasShadow
                    sx={{
                      color: "#707683",
                      p: "5px !important",
                      borderRadius: "10px !important",
                      pl: "15px !important",
                    }}
                  >
                    <StyledText>{company.name}</StyledText>
                  </BoxUi>
                </Box>
              ))} */}

              <BoxUi
                hasShadow
                sx={{
                  color: "#707683",
                  p: "5px !important",
                  borderRadius: "10px !important",
                  pl: "15px !important",
                }}
              >
                <StyledText>Updated company data will be shown here</StyledText>
              </BoxUi>
            </Box>
          </DialogContent>
        </Dialog>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </Box>
  );
}
