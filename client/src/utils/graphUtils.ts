import { ChartsColorConfig } from "../pages/finance/financeTab.config";

interface APIResponse {
  data: Datum[];
}

interface Datum {
  title: string;
  set: Item[];
}

interface Item {
  year: number;
  value: number;
}

interface ChartData {
  labels: number[];
  datasets: Dataset[];
  borderRadius: number[];
  borderWidth: number;
}

interface Dataset {
  id: string;
  label: string;
  data: (number | null)[];
  backgroundColor: string;
  borderColor: string;
  barPercentage?: number;
  categoryPercentage?: number; //
}

export function convertAPIResponseToBarChartData(
  apiResponse: APIResponse
): ChartData {
  const data = apiResponse.data;
  const years = new Set<number>();
  data.forEach((datum) => {
    datum.set.forEach((item) => {
      years.add(item.year);
    });
  });

  const new2 = Array.from(years);

  const chartData: ChartData = {
    labels: [...new2],
    datasets: [],
    borderRadius: [0, 0, 30, 30],
    borderWidth: 1,
  };

  // Extract the data values from the API response and add them to the chartData object
  data.forEach((datum, i) => {
    const values = new Array<number | null>(new2.length).fill(null); // Initialize an array of null values with the same length as the labels array
    datum.set.forEach((item) => {
      // Find the index of the year in the labels array and set the corresponding value in the values array
      const index = new2.indexOf(item.year);
      if (index !== -1) {
        values[index] = item.value;
      }
    });

    const currentColor =
      ChartsColorConfig[i % ChartsColorConfig.length] ?? "#F98600";

    chartData.datasets.push({
      id: i.toString(), // Generate a unique id for each dataset
      label: datum.title,
      data: values,
      backgroundColor: currentColor,
      borderColor: currentColor,
      barPercentage: 0.6, // Adjust the value to control the width of bars
      categoryPercentage: 0.9,
    });
  });

  return chartData;
}

export function convertData(data: { [key: string]: any }): ChartData {
  const chartData: ChartData = {
    labels: Object.keys(data).map(Number),
    datasets: [],
    borderRadius: [],
    borderWidth: 0,
  };

  Object.values(data).forEach((periodData: { growth: Datum[] }) => {
    periodData.growth.forEach((datum, i) => {
      const companyIndex = chartData.datasets.findIndex(
        (dataset) => dataset.label === datum.title
      );
      const currentColor =
        ChartsColorConfig[i % ChartsColorConfig.length] ?? "#F98600";

      datum.set.forEach((item) => {
        if (companyIndex === -1) {
          chartData.datasets.push({
            id: `${i}_${item.year}`, // Generate a unique id for each dataset and year combination
            label: datum.title,
            data: [item.value],
            backgroundColor: currentColor,
            borderColor: currentColor,
          });
        } else {
          chartData.datasets[companyIndex].data.push(item.value);
        }
      });
    });
  });

  return chartData;
}

export function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
