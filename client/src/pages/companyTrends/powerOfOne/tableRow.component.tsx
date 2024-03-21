import { useMemo, useState } from "react";
import styles from "./PowerOfOne.module.scss";

interface TableRowProps {
  rowData: {
    label: string;
    value: number;
  };
  increment?: boolean;
}

// const TableRow = ({ rowData, increment = false }: any) => {
//   const [improvement, setImprovement] = useState(1.0);

//   const value = useMemo(
//     () => (improvement * rowData.value).toFixed(2),
//     [improvement]
//   );

//   return (
//     <tr>
//       <td className="align-middle">{rowData.label}</td>
//       <td className="align-middle">
//         <div
//           className={
//             "form-group d-flex align-items-center justify-content-center " +
//             styles.numberInputContainer
//           }
//         >
//           {increment ? "+" : "-"}{" "}
//           <input
//             type="number"
//             className="form-control text-center"
//             id="improvement"
//             value={improvement}
//             onChange={(e) => {
//               const newValue = parseFloat(e.target.value);
//               setImprovement(newValue);
//             }}
//           />{" "}
//           %
//         </div>
//       </td>
//       <td className="align-middle text-right">{value}</td>
//     </tr>
//   );
// };

const TableRow: React.FC<TableRowProps> = ({ rowData, increment = false }) => {
  const [improvement, setImprovement] = useState(1.0);

  const value = useMemo(
    () => (improvement * rowData.value).toFixed(2),
    [improvement]
  );

  return (
    <tr>
      <td className="align-middle">{rowData.label}</td>
      <td className="align-middle">
        <div
          className={
            "form-group d-flex align-items-center justify-content-center " +
            styles.numberInputContainer
          }
        >
          {increment ? "+" : "-"}{" "}
          <input
            type="number"
            className="form-control text-center"
            id="improvement"
            value={improvement}
            onChange={(e) => {
              setImprovement(parseFloat(e.target.value));
            }}
          />{" "}
          %
        </div>
      </td>
      <td className="align-middle text-right">{value}</td>
    </tr>
  );
};

export default TableRow;
