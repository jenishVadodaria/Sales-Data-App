import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "./peopleIntelligence.module.scss";

const LayoffTrends = (props: any) => {
  const brr = props.data[0].set.map((item: any) => {
    return parseInt(item.value, 10);
  });

  const labelsArray = props.data[0].set.map((item: any) => {
    return item.month;
  });

  const labels = labelsArray.reverse();

  //   console.log("props.data", props.data.Layoffs);
  const acctRevChartConfig = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Employees",
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: brr.reverse(),

        borderColor: "rgba(156, 23, 158, 1)",
        borderRadius: [0, 0, 30, 30],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className={styles.shadow + " w-50 mx-3 p-3 rounded rounded-3 "}>
        <h3 className="fs-5 fw-bold my-2">{props.title}</h3>
        <hr />
        <div className="my-2">
          <p className="my-2 text-secondary fs-6">{props.para}</p>
          <Line data={data} options={acctRevChartConfig} />
        </div>
      </div>
    </>
  );
};
export default LayoffTrends;
