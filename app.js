// Visuals to graph: Bar Chart, Bubble Chart, and Table

// Create a function to collect the demographic data
// First console log the whole data to see its structure
function demographic(id) {
    
    d3.json("data/samples.json").then((alldata) => {
        console.log(alldata);

        var metadata = alldata.metadata.filter(me => me.id.toString()=== id)[0];
        console.log(metadata);

        var htmlDemographicInfo = d3.select("#sample-metadata");

        htmlDemographicInfo.html("");

        Object.entries(metadata).forEach((key) => {
            htmlDemographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });

    });
}

demographic();

//_____________________________________________________________________________
// Create a function to collect and create the requested visualizations (bar graph, bubble graph and pie chart)
//  Data needed to populate graphs: sample_values, otu-ids, otu_labels

function graphs(id) {

    d3.json("data/samples.json").then(function(alldata) {
        console.log(alldata)
        
        // Create variables to hold all the data needed to create the visualizations
        var data = alldata;

        var wfreq = data.metadata.map(m=>m.wfreq);
        console.log(wfreq)

        var samples = data.samples.filter(sample => sample.id.toString()===id)[0];
        console.log(samples);

        var sampleValues = samples.sample_values.slice(0, 10).reverse();
        console.log(sampleValues);

        var OtuIds = samples.otu_ids.slice(0, 10).reverse();
        console.log (OtuIds)
        var OtuIds1 = OtuIds.map(data => "OTU"+ data)
        console.log(OtuIds1);

        var OtuLabels = samples.otu_labels.slice(0, 10).reverse();
        console.log (OtuLabels);

        // Use the created variables to create the visualizations
        // Go to the HTML to identify the name holding the visualizations ("bar", "bubble", "gauge")
        var trace = {
            x: sampleValues,
            y: OtuIds1,
            text: OtuLabels,
            type: "bar",
            orientation: "h",
        };   

        var data = [trace];
        
        var layout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 70,
                r: 50,
                t: 50,
                b: 50
            }
        };

        Plotly.newPlot("bar", data, layout);
    
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        var layout = {
            xaxis: { title: "OTU ID" },
            height: 500,
            width: 1250
        };

        var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout);

        var trace3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: parseFloat(wfreq),
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: { axis: { range: [null, 9] },
                    steps: [
                    { range: [0, 2], color: "cyan" },
                    { range: [2, 4], color: "cyan" },
                    { range: [4, 6], color: "cyan" },
                    { range: [6, 8], color: "cyan" },
                    { range: [8, 9], color: "cyan" },
                    ]}
           
            }
        ];
        
        var layout = { width: 500, height: 500, margin: { t: 20, b: 40, l:100, r:100  } };
        Plotly.newPlot('gauge', trace3, layout);

        var tracePie = {
            labels: OtuIds,
            values: sampleValues,
            type: "pie",
        }

        var data = [tracePie]


        Plotly.newPlot("pie", data)

});

}

graphs();

//_____________________________________________________________________________
// Create a function that allows to change data values to display different 
// visualizations depending on the user selection

function optionChanged(id){

    demographic(id);
    graphs(id);
    
}

//_____________________________________________________________________________
// Finally create a function that bring all the other functions together
// on that will use the html dropdown selection menu to change the data on the 
// visualizations depending on the user selection

function dropdown () {
    var drop_down = d3.select("#selDataset");

    d3.json("data/samples.json").then((data) => {
        console.log(data)
    
        var SelectID = data.names;
        console.log(SelectID);

        // Use the forEach method to append all the ids to the dropdown menu
        SelectID.forEach(function(id) {
            drop_down.append('option').text(id).property("value");
        });

        demographic(data.names[0]);
        graphs(data.names[0]);
        

    });
}

dropdown();
