const data = [
  {
    Cheese: 22.2,
    CHOCOLATE: 10.3,
    Impulse: 1.5,
    period: "2021_26",
  },
  {
    Cheese: 21.8,
    CHOCOLATE: 9.8,
    Impulse: 1.5,
    period: "2021_27",
  },
  {
    Cheese: 21.2,
    CHOCOLATE: 9.7,
    Impulse: 1.4,
    period: "2021_28",
  },
];

// Helper functions

/**
 * Render a Chart.js graph
 * @param {string} elementID value of the HTML ID attribute
 * @param {string} graphType type of Chart
 * @param {array} graphLabels Chart labels
 * @param {array} graphDatasets Chart datasets
 */
const renderGraph = (elementID, graphType, graphLabels, graphDatasets) => {
  const ctx = document.getElementById(elementID).getContext("2d");
  new Chart(ctx, {
    type: graphType,
    data: {
      labels: graphLabels,
      datasets: graphDatasets,
    },
  });
};

/**
 * Get a new data with new Total average attribute
 * @param {array} dataArr provide a data array
 * @returns dataArr with new total element
 */
const getDataWithTotal = (dataArr) =>
  dataArr.map((singleData) => {
    let total = 0;
    for (let key in singleData) {
      if (key !== "period") {
        total += singleData[key];
      }
    }

    // use immutable data structure to modify singleData object
    // (which is referenced to data array) with the help of shallow copy
    return Object.assign({ ...singleData }, { total: total / 3 });
  });

/**
 * Create a datasets from an array of data.
 * @param {array} dataArr
 * @returns array of datasets
 */
const createDatasetFromData = (dataArr) => {
  // retrieve keys from the given dataArr
  const dataKeys = Object.keys(dataArr[0]);

  return dataKeys
    .filter((item) => item !== "period") // exclude the Period key from dataKeys array
    .map((key) => {
      return {
        label: key,
        // skip the first callbackFn paramter using undefined
        data: dataArr.map((undefined, index) => {
          return dataArr[index][key];
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      };
    });
};

const labels = data.map((d) => d["period"]);
const dataWithTotal = getDataWithTotal(data);

renderGraph("myChart", "line", labels, createDatasetFromData(dataWithTotal));
