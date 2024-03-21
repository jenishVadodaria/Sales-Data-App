import React, { useEffect, useState } from "react";
import PainPointCard from "./painPointCard";
import { Checkbox } from "@mui/material";
import { ifSelected, selectData } from "../../../utils/dataSelection";

export const PainPoints = ({
  problems,
  challenges,
  painPoints,
  selectedData,
}: any) => {
  const [isChecked, setIsChecked] = useState(false);
  const painPointTest = [
    {
      type: "Problems",
      contents: problems ? problems : [],
    },
    {
      type: "painPoints",
      contents: painPoints ? painPoints : [],
    },
    {
      type: "Challenges",
      contents: challenges ? challenges : [],
    },
  ];

  useEffect(() => {
    const isProblems = ifSelected("problems");
    const isPainPoints = ifSelected("painPoints");
    const isChallanges = ifSelected("challenges");
    setIsChecked(isProblems && isPainPoints && isChallanges);
  }, [selectedData]);

  return (
    <>
      <div className="text-dark my-4">
        <div className="text-start mx-3 px-2 flex align-items-center">
          <h2 className="text-dark fw-bold fs-3">
            Problems, Pain Points & Key Challenges
          </h2>
          <Checkbox
            checked={isChecked}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            onChange={(e) => {
              const isProblems = selectData("problems", problems);
              const isPainPoints = selectData("painPoints", painPoints);
              const isChallanges = selectData("challenges", challenges);
              setIsChecked(isProblems && isPainPoints && isChallanges);
            }}
          />
        </div>
        <div className="my-5 grid grid-cols-3 gap-0">
          {/* {data.problemsPainsChallenges.map((item: any, index: any) => ( */}
          {painPointTest.map((item: any, index: any) => (
            <div className="mx-2.5" key={index}>
              <div>
                <PainPointCard
                  type={item.type}
                  contents={item.contents}
                  cssCard={index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
