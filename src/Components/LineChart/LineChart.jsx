import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
const LineChart = ({historicalData}) => {
  const [data, setData] = useState([["Data", "Prices"]]);
  useEffect(() => {
    let dataCopy = [["Data", "Prices"]];
    if (historicalData && historicalData.prices) {
      historicalData.prices.map((item) => {
        console.log(item);
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1]
        ]);
      });
    }
    setData(dataCopy);
    console.log(dataCopy);
  }, [historicalData]);
  return (
    <>
    
    {console.log(data)}
    {console.log(historicalData)}

    <Chart chartType = 'LineChart' data={data}
    height = "100%" legendToggle/>
    </>
  );
};

export default LineChart;
