import { useState } from "react";
import Select from "react-select";
import styles from "./PowerOfOne.module.scss";
import TableRow from "./tableRow.component";
import React from "react";

interface PowerOfOneProps {
  data: {
    [key: string]: {
      [key: string]: {
        [key: string]: {
          "Cash Flow Benefits (Millions – CHF)": string;
          "Improvement (1 % or 1 Day)": number;
        }[];
      };
    };
  };
}

const timeFrameOptions = [
  {
    value: "annual data dec 2021",
    label: "Annual data - Dec 2021",
  },
  {
    value: "latest twelve months - Sep 2022",
    label: "Latest twelve months - Sep 2022",
  },
];

// const PowerOfOne = ({ data }: any) => {
//   const [timeFrame, setTimeFrame] = useState(timeFrameOptions[0].value);

//   const timeFrameChange = (data: any) => {
//     setTimeFrame(data.value);
//   };

//   const fakeData: any = {
//     Growth: {
//       "Row 1": {
//         "annual data dec 2021": [
//           {
//             "Cash Flow Benefits (Millions – CHF)": "10",
//           },
//         ],
//         "latest twelve months - Sep 2022": [
//           {
//             "Cash Flow Benefits (Millions – CHF)": "15",
//           },
//         ],
//       },
//       "Row 2": {
//         "annual data dec 2021": [
//           {
//             "Cash Flow Benefits (Millions – CHF)": "20",
//           },
//         ],
//         "latest twelve months - Sep 2022": [
//           {
//             "Cash Flow Benefits (Millions – CHF)": "25",
//           },
//         ],
//       },
//     },
//     Profitability: {
//       "Row 1": {
//         "annual data dec 2021": [
//           {
//             "Cash Flow Benefits (Millions – CHF)": "30",
//           },
//         ],
//         "latest twelve months - Sep 2022": [
//           {
//             "Cash Flow Benefits (Millions – CHF)": "35",
//           },
//         ],
//       },
//       "Row 2": {
//         "annual data dec 2021": [
//           {
//             "Cash Flow Benefits (Millions – CHF)": "40",
//           },
//         ],
//         "latest twelve months - Sep 2022": [
//           {
//             "Cash Flow Benefits (Millions – CHF)": "45",
//           },
//         ],
//       },
//     },
//   };

//   return (
//     <>
//       <div className="my-4" style={{ fontSize: "22px", fontWeight: 700 }}>
//         <h3>Power of One</h3>
//       </div>
//       <div className="d-flex align-items-center mb-4">
//         <p
//           style={{
//             fontSize: "16px",
//             marginRight: "20px",
//           }}
//         >
//           Period:
//         </p>
//         <Select
//           className="w-52 pt-1 z-20 text-base"
//           classNamePrefix="select"
//           defaultValue={timeFrameOptions[0]}
//           name="timeFrame"
//           options={timeFrameOptions}
//           onChange={timeFrameChange}
//         />
//       </div>
//       <table className={"table " + styles.tableTypo}>
//         <thead>
//           <tr className={styles.primaryHeader}>
//             <th scope="col" colSpan={2}></th>
//             <th scope="col">Power of One</th>
//           </tr>
//           <tr className={styles.secondaryHeader}>
//             <th scope="col"></th>
//             <th scope="col">
//               Improvement <br /> (1% or 1 Day)
//             </th>
//             <th scope="col">
//               Cash Flow Benefits <br />
//               (Millions - CHF)
//             </th>
//           </tr>
//         </thead>

//         {Object.keys(fakeData).map((el, i) => (
//           <>
//             <thead className={styles.tertiaryHeader} key={`thead-${i}`}>
//               <tr>
//                 <th scope="col">{el}</th>
//                 <th scope="col"></th>
//                 <th scope="col"></th>
//               </tr>
//             </thead>
//             <tbody key={`tbody-${i}`}>
//               {Object.keys(fakeData[el]).map((rowEl) => {
//                 return (
//                   <TableRow
//                     key={rowEl}
//                     increment={el === "Growth"}
//                     rowData={{
//                       label: rowEl,
//                       // TODO: edit `Cash Flow Benefits (Millions – CHF)` once backend is updated
//                       value: parseInt(
//                         fakeData[el]?.[rowEl]?.[timeFrame]?.[0]?.[
//                           "Cash Flow Benefits (Millions – CHF)"
//                         ]
//                       ),
//                     }}
//                   />
//                 );
//               })}
//             </tbody>
//           </>
//         ))}
//         {/* <thead className={styles.tertiaryHeader}>
//                 <tr>
//                     <th scope="col">Growth</th>
//                     <th scope="col"></th>
//                     <th scope="col"></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {PO1data.growth.map((el) => <TableRow rowData={el} increment />)}
//             </tbody>
//             <thead className={styles.tertiaryHeader}>
//                 <tr>
//                     <th scope="col">Profitability</th>
//                     <th scope="col"></th>
//                     <th scope="col"></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {PO1data.profitability.map((el) => <TableRow rowData={el} />)}
//             </tbody> */}
//       </table>
//     </>
//   );
// };

const PowerOfOne: React.FC<PowerOfOneProps> = ({ data }) => {
  const [timeFrame, setTimeFrame] = useState(timeFrameOptions[0].value);

  const timeFrameChange = (selectedOption: any) => {
    setTimeFrame(selectedOption.value);
  };

  return (
    <>
      <div className="my-4" style={{ fontSize: "22px", fontWeight: 700 }}>
        <h3>Power of One</h3>
      </div>
      <div className="d-flex align-items-center mb-4">
        <p
          style={{
            fontSize: "16px",
            marginRight: "20px",
          }}
        >
          Period:
        </p>
        <Select
          className="w-52 pt-1 z-20 text-base"
          classNamePrefix="select"
          defaultValue={timeFrameOptions[0]}
          name="timeFrame"
          options={timeFrameOptions}
          onChange={timeFrameChange}
        />
      </div>
      <table className={"table " + styles.tableTypo}>
        <thead>
          <tr className={styles.primaryHeader}>
            <th scope="col" colSpan={2}></th>
            <th scope="col">Power of One</th>
          </tr>
          <tr className={styles.secondaryHeader}>
            <th scope="col"></th>
            <th scope="col">
              Improvement <br /> (1% or 1 Day)
            </th>
            <th scope="col">
              Cash Flow Benefits <br />
              (Millions - CHF)
            </th>
          </tr>
        </thead>
        {data &&
          Object.keys(data).map((el, i) => (
            <React.Fragment key={`fragment-${i}`}>
              <thead className={styles.tertiaryHeader}>
                <tr>
                  <th scope="col">{el}</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data[el] &&
                  Object.keys(data[el]).map((rowEl, j) => (
                    <TableRow
                      key={`row-${j}`}
                      increment={el === "growth"}
                      rowData={{
                        label: rowEl,
                        value: parseInt(
                          data[el][rowEl][timeFrame][0][
                            "Cash Flow Benefits (Millions – CHF)"
                          ]
                        ),
                      }}
                    />
                  ))}
              </tbody>
            </React.Fragment>
          ))}
      </table>
    </>
  );
};

export default PowerOfOne;
