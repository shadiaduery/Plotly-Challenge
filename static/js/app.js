
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Add event listener for submit button
d3.select("#selDataset").on("click", handleSubmit);

// Add event listener for submit button
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  // What does `.node()` do?
  var dataset = d3.select(".optionChanged(this.value)").node().value;
  console.log(dataset);

    // clear the input value
    d3.select("#stockInput").node().value = "";

      // Update the Dashboard!
  updateDash(dataset);
}

function updateDash(dataset) {
  var alldata = 3.json("data/sample.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
    console.log(data)
  
    // // Sort the data array using the greekSearchResults value
    // data.sort(function(a, b) {
    //   return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
    });
  
//     // Slice the first 10 objects for plotting
//     data = data.slice(0, 10);
  
//     // Reverse the array due to Plotly's defaults
//     data = data.reverse();
//   // update the components on the dashboard
//   buildPlot(alldata);
//   buildTable(alldata);
// }
// console.log(dataset);

// function buildPlot(alldata) {
//   d3.json(alldata).then(function(data) {
//     // Grab values from the response json object to build the plots
//     var name = data.dataset.name;
//     var stock = data.dataset.dataset_code;
//     var startDate = data.dataset.start_date;
//     var endDate = data.dataset.end_date;
//     // Print the names of the columns
//     console.log(data.dataset.column_names);
//     // Print the data for each day
//     console.log(data.dataset.data);
//     var dates = unpack(data.dataset.data, 0);
//     // console.log(dates);
//     var closingPrices = unpack(data.dataset.data, 4);
//     // console.log(closingPrices);

//     var trace1 = {
//       type: "scatter",
//       mode: "lines",
//       name: name,
//       x: dates,
//       y: closingPrices,
//       line: {
//         color: "#17BECF"
//       }
//     };

//     var data = [trace1];

//     var layout = {
//       title: `${stock} closing prices`,
//       xaxis: {
//         range: [startDate, endDate],
//         type: "date"
//       },
//       yaxis: {
//         autorange: true,
//         type: "linear"
//       }
//     };

//     Plotly.newPlot("plot", data, layout);

//   });
// }

// d3.json("data/sample.json").then((data) => {
//   //  Create the Traces
//   var trace1 = {
//     x: data.organ,
//     y: data.survival.map(val => Math.sqrt(val)),
//     type: "box",
//     name: "Cancer Survival",
//     boxpoints: "all"
//   };

//   // Create the data array for the plot
//   var data = [trace1];

//   // Define the plot layout
//   var layout = {
//     title: "Square Root of Cancer Survival by Organ",
//     xaxis: { title: "Organ" },
//     yaxis: { title: "Square Root of Survival" }
//   };

//   // Plot the chart to a div tag with id "plot"
//   Plotly.newPlot("plot", data, layout);
// });