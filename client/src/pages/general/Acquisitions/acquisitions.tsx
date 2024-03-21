import { useEffect, useState } from "react";
import styles from "./acquisitions.module.scss";
import { Checkbox } from "@mui/material";
import { ifSelected, selectData } from "../../../utils/dataSelection";

const Acquisitions = ({ latestLaunches, selectedData }: any) => {
  const [size, setSize] = useState(5);
  const [isChecked, setIsChecked] = useState(false);
  function limit(string = "", limit = 240) {
    return string.substring(0, limit) + "...";
  }

  const dataTest = {
    latestAquisition: [
      {
        url: "https://example.com/article1",
        contents: {
          title: "Article 1",
          desc: "Description of Article 1",
        },
        date: "2023-06-30",
      },
      {
        url: "https://example.com/article2",
        contents: {
          title: "Article 2",
          desc: "Description of Article 2",
        },
        date: "2023-06-29",
      },
      {
        url: "https://example.com/article3",
        contents: {
          title: "Article 3",
          desc: "Description of Article 3",
        },
        date: "2023-06-28",
      },
      {
        url: "https://example.com/article4",
        contents: {
          title: "Article 4",
          desc: "Description of Article 4",
        },
        date: "2023-06-27",
      },
      {
        url: "https://example.com/article5",
        contents: {
          title: "Article 5",
          desc: "Description of Article 5",
        },
        date: "2023-06-26",
      },
      {
        url: "https://example.com/article6",
        contents: {
          title: "Article 6",
          desc: "Description of Article 6",
        },
        date: "2023-06-25",
      },
    ],
  };

  useEffect(() => {
    setIsChecked(ifSelected("latestLaunches"));
  }, [selectedData]);

  return (
    <>
      <div className="my-5 ">
        <div className="text-start mx-3 px-2 flex align-items-center">
          <h2 className="text-dark fw-bold fs-3 my-5">
            Latest Acquisitions/ Products / services Launched
          </h2>
          <Checkbox
            checked={isChecked}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            onChange={(e) => {
              setIsChecked(selectData("latestLaunches", latestLaunches));
            }}
          />
        </div>
        <div className="mx-3 px-4 py-1 border border-2 rounded rounded-2">
          <ul className={styles.list_styling}>
            {latestLaunches &&
              latestLaunches?.slice(0, size).map((item: any, i: any) => (
                <li
                  // onClick={() => {
                  //   window.open(`${item.url}`);
                  // }}
                  key={i}
                  className="my-4 cursor-pointer"
                >
                  <h3 className="my-2 fw-bold fs-5 text-dark">
                    {item.description?.substring(0, 100) + "..."}
                  </h3>
                  <p className="my-2 text-secondary fs-6 lh-base">
                    {limit(item.description)}
                  </p>
                  <div
                    className={styles.date + " text-primary  text-start my-3"}
                  >
                    {item.date}
                  </div>
                  {i != latestLaunches?.slice(0, size).length - 1 && <hr />}
                </li>
              ))}
            {latestLaunches?.length > size && (
              <div className="text-end fs-6 my-2 text-primary cursor-pointer">
                <button onClick={() => setSize(latestLaunches?.length)}>
                  Load more
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Acquisitions;
