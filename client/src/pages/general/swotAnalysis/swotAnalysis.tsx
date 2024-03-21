import styles from "./SwotAnalysis.module.scss";
import strength from "../../../assets/strength.png";
import opportunities from "../../../assets/opportunities.png";
import weakness from "../../../assets/weakness.png";
import threats from "../../../assets/threats.png";
import { Checkbox } from "@mui/material";
import { ifSelected, selectData } from "../../../utils/dataSelection";
import { useEffect, useState } from "react";

export default function SwotAnalysis({ swot, selectedData }: any) {
  const [isChecked, setIsChecked] = useState(false);
  const data = [
    {
      image: `${strength}`,
      heading: "Strength",
      headingColor: "#48991E",
      //   para: analysis.swot[0].content.split("\n"),
      para: swot && swot[0]?.strengths,
    },
    {
      image: `${weakness}`,
      heading: "Weakness",
      headingColor: "#4F77CC",
      //   para: analysis.swot[1].content.split("\n"),
      para: swot && swot[0]?.weaknesses,
    },
    {
      image: `${opportunities}`,

      heading: "Opportunities",
      headingColor: "#B8690C",
      //   para: analysis.swot[2].content.split("\n"),
      para: swot && swot[0]?.opportunities,
    },
    {
      image: `${threats}`,
      heading: "Threats",
      headingColor: "#FC0404",
      //   para: analysis.swot[3].content.split("\n"),
      para: swot && swot[0]?.threats,
    },
  ];

  useEffect(() => {
    setIsChecked(ifSelected("swot"));
  }, [selectedData]);

  return (
    <>
      <div className={styles.fontSize + " my-5"}>
        <div className="flex justify-content-center w-full align-items-center">
          <h2 className="text-center  fs-2 fw-bold my-5">SWOT Analysis</h2>
          <Checkbox
            checked={isChecked}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            onChange={(e) => {
              setIsChecked(selectData("swot", swot));
            }}
          />
        </div>
        <div className={styles.image + " d-flex justify-content-between"}>
          {data.map(({ image, heading, para, headingColor }, index) => (
            <div className="w-25 mx-3" key={index}>
              <div className={" rounded-2 p-3 "}>
                <div>
                  <div
                    style={{
                      width: "110px",
                      height: "110px",
                      // position: "relative",
                    }}
                    className="mx-auto p-4 bg-white shadow-sm rounded-circle"
                  >
                    <img
                      width="80px"
                      className="mx-auto"
                      src={image}
                      alt={image}
                      // style={{
                      //   position: "absolute",
                      //   top: "18px",
                      //   right: "12px",
                      // }}
                    />
                  </div>
                </div>

                <h4 className="text-center fw-bold my-3 fs-3">
                  <div style={{ color: `${headingColor}` }}>{heading}</div>
                </h4>
                <ul className={styles.ul}>
                  {para &&
                    para.map((item: any, index: any) => (
                      <li
                        key={index}
                        className="text-start text-secondary mx-auto my-3 fs-6 lh-sm"
                      >
                        {item}
                        {/* {para} */}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
