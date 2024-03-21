import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./TabComponent.scss";
import { TabData } from "./tabComponent.config";
import CompanySelect from "../companySelect/companySelect";
import styled from "styled-components";
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import axios from "axios";
import { appConstants } from "../../utils/app.constants";
import LoadingCube from "../loadingCube/LoadingCube";
import { useAuthContext } from "../../context/AuthContext";

const StyledTextHeading = styled.h4`
  font-style: normal;
  font-family: Epilogue, sans-serif;
  font-weight: 550;
  font-size: 27px;
  line-height: 27px;
  letter-spacing: 0.01em;
  margin: 0;
`;

function TabComponent() {
  // const [company, setCompany] = useState<any>();
  const [companyDetails, setCompanyDetails] = useState<any>();
  const [tabsLoading, setTabsLoading] = useState(true);

  const { user, updateUser } = useAuthContext();

  const [selectedData, setSelectedData] = useState(0); //manage selected data

  // console.log(user?.following, "followinggggg");

  // const LOCAL_STORAGE_KEY = "selectedCompany";

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const storedCompany = localStorage.getItem(LOCAL_STORAGE_KEY);
    //     if (storedCompany) {
    //       const response = await axios.get(
    //         // `${appConstants.baseApiUrl}/companies/${company.value}`
    //         `${appConstants.baseApiUrl}/companies/${
    //           JSON.parse(storedCompany).value
    //         }`
    //       );
    //       setCompanyDetails(response.data);
    //       // console.log(response.data);
    //     } else {
    //       // Fetch data for any one company by default
    //       const defaultCompanyResponse = await axios.get(
    //         `${appConstants.baseApiUrl}/companies/64ae75b630cde70c6db401a3`
    //       );
    //       console.log(defaultCompanyResponse, "+++");

    //       setCompanyDetails(defaultCompanyResponse.data);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data for companies the user follows
      // const response = await axios.get(`${appConstants.baseApiUrl}/users/user/followed-companies`);
      const followedCompanies = user?.following;

      if (followedCompanies && followedCompanies.length > 0) {
        const companyResponse = await axios.get(
          `${appConstants.baseApiUrl}/companies/published/${followedCompanies[0]}`
        );
        const companyData = companyResponse.data;
        companyData.isFollowed = user?.following?.includes(companyData._id);
        if (companyData) {
          setCompanyDetails(companyData);
          setTabsLoading(false);
          if (localStorage.getItem("companyData")) {
            setSelectedData(getRandomInt(10000));
            localStorage.removeItem("companyData");
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(user?.following, "followingg");

  const handleCompanyChange = async (selectedCompany: any) => {
    // setCompanyDetails(null);
    setTabsLoading(true);

    const companyResponse = await axios.get(
      `${appConstants.baseApiUrl}/companies/published/${selectedCompany.value}`
    );
    // setCompanyDetails(companyResponse.data);
    const companyData = companyResponse.data;
    companyData.isFollowed = user?.following?.includes(companyData._id);
    if (companyData) {
      setCompanyDetails(companyData);
      setTabsLoading(false);
      if (localStorage.getItem("companyData")) {
        setSelectedData(getRandomInt(10000));
        localStorage.removeItem("companyData");
      }
    }
  };

  const handleFollow = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && companyDetails) {
      try {
        const followCompanyData = {
          userId: user?._id,
          companyId: companyDetails._id,
        };

        if (companyDetails.isFollowed) {
          await axios.post(
            `${appConstants.baseApiUrl}/users/user/unfollow`,
            followCompanyData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setCompanyDetails((prevData: any) => ({
            ...prevData,
            isFollowed: false,
          }));

          if (user?.following?.includes(companyDetails._id)) {
            const updatedFollowing = user?.following.filter(
              (companyId: string) => companyId !== companyDetails._id
            );
            updateUser({ ...user, following: updatedFollowing });
          }

          // const updatedFollowing = user?.following.filter(
          //   (companyId: string) => companyId !== companyDetails._id
          // );
          // updateUser({ ...user, following: updatedFollowing });

          console.log("Unfollowed company successfully");
        } else {
          await axios.post(
            `${appConstants.baseApiUrl}/users/user/follow`,
            followCompanyData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setCompanyDetails((prevData: any) => ({
            ...prevData,
            isFollowed: true,
          }));

          // if (user?.following?.includes(companyDetails._id)) {
          //   const updatedFollowing = user?.following.filter(
          //     (companyId: string) => companyId !== companyDetails._id
          //   );
          //   updateUser({ ...user, following: updatedFollowing });
          // }

          if (user && user.following) {
            const updatedFollowing = [...user.following, companyDetails._id];
            updateUser({ ...user, following: updatedFollowing });
          }

          console.log("Followed company successfully");
        }
      } catch (error) {
        console.error("Error in follow/unfollow:", error);
      }
    }
  };

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const handleSubmit = () => {
    const companyDetails = localStorage.getItem("companyData");
    if (companyDetails) {
      const companyData = JSON.parse(companyDetails);
      console.log("selected Data", companyData);
      setSelectedData(getRandomInt(10000));
      localStorage.removeItem("companyData");
    } else {
      alert("Please select company details");
    }
  }; //handleSubmit

  return (
    <div className="pt-2">
      <CompanySelect
        onCompanyChange={handleCompanyChange}
        isFollowing={companyDetails?.isFollowed}
        handleFollow={handleFollow}
        currentCompanyId={companyDetails?._id}
      />
      {companyDetails ? (
        <>
          <Box sx={{ pt: "20px", pb: "10px" }}>
            <div className="flex justify-between items-center">
              <StyledTextHeading>{companyDetails?.name}</StyledTextHeading>
              <Button
                variant="contained"
                color="primary"
                className=""
                onClick={handleSubmit}
              >
                Select Data
              </Button>
            </div>
          </Box>
          <Tabs
            defaultActiveKey={TabData[0].label}
            id="uncontrolled-tabs"
            className="mb-3 sticky top-0 bg-white z-10"
          >
            {TabData.map(({ label, value, desc }) => {
              return (
                <Tab eventKey={label} title={label} key={value}>
                  {/* {desc(companyDetails)} */}
                  {tabsLoading ? (
                    <LoadingCube
                      isFullScreen={true}
                      height="200px"
                      width="200px"
                    />
                  ) : (
                    desc(companyDetails, selectedData)
                  )}
                </Tab>
              );
            })}
          </Tabs>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box sx={{ width: "20%", textAlign: "center" }}>
            <Typography variant="h5"> Loading data...</Typography>
            <LinearProgress />
          </Box>
        </Box>
        //  <LoadingCube isFullScreen={true} height="200px" width="200px" />
      )}
    </div>
  );
}

export default TabComponent;
