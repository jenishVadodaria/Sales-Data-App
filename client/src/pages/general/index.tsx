import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingCube from "../../components/loadingCube/LoadingCube";
import CompanyProfile from "./companyProfile/companyProfile";
import SwotAnalysis from "./swotAnalysis/swotAnalysis";
import RecentBoard from "./recentBoard/recentBoard";
import { PainPoints } from "./painpoints/painPoints";
import Acquisitions from "./Acquisitions/acquisitions";
import FocusArea from "./focusArea/focusArea";
import RiskAssociated from "./riskAssociated/riskAssociated";
import { Box, Skeleton } from "@mui/material";

export default function GeneralPage({
  challenges,
  email,
  headquarter,
  keyMembers,
  latestLaunches,
  painPoints,
  problems,
  profile,
  recentBoardAnnouncement,
  risks,
  strategicFocusAreas,
  swot,
  website,
  selectedData,
}: any) {
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (website) {
  //     setLoading(false);
  //   }
  // }, []);

  return (
    <div>
      <>
        <CompanyProfile
          profile={profile}
          headquarter={headquarter}
          website={website}
          email={email}
          keyMembers={keyMembers}
          selectedData={selectedData}
        />
        <SwotAnalysis swot={swot} selectedData={selectedData} />
        <RecentBoard recentBoardAnnouncement={recentBoardAnnouncement} />
        <PainPoints
          painPoints={painPoints}
          problems={problems}
          challenges={challenges}
          selectedData={selectedData}
        />
        <Acquisitions
          latestLaunches={latestLaunches}
          selectedData={selectedData}
        />
        <FocusArea
          strategicFocusAreas={strategicFocusAreas}
          selectedData={selectedData}
        />
        <RiskAssociated risks={risks} selectedData={selectedData} />
        <Box height={"30px"}></Box>
      </>
    </div>
  );
}
