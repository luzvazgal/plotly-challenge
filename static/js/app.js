var meta_data = []
var samples_data = []

/* Initializing objects where the results will be displayed*/
//Panel 
let panel_body = d3.select("#sample-metadata")


//Allocating individual's ids to be selected in dropdown menu
d3.json("../../data/samples.json").then(function(bacteriaData) {

    //Assigning json metadata record to a dictionary
    meta_data = bacteriaData.metadata
    samples_data = bacteriaData.samples

    //Getting dropdown to append option list of ids as list of value option
    let selectList = d3.select('#selDataset')

    //Adding list of ids to select option
    selectList.selectAll('option')
    .data(bacteriaData.names)
    .enter()
    .append('option')
    .text(id=>id)

    //Loading data using the first individual id
    optionChanged(bacteriaData.names[0])

})

/**
 * Given a person's id, it displays all  their related info according to selected option in dropdown list
 * @param {string} choice_id 
 */
function optionChanged(choice_id){

    console.log(choice_id)
  
    //Clearing all previous Results before displaying current results
    clearResults()
 
    /*DEMOGRAPHIC INFO*/
    //Getting the record from metadata corresponding to the user's selected id
    let metadata_rec = meta_data.filter(rec=>rec.id== parseInt(choice_id))

    //Washing frequency value to be used in gauge chart
    let washing_freq = 0.0;

    //Displaying info according the selected option in panel body. It's only one record
    metadata_rec.forEach(function (record){
        washing_freq = record.wfreq

        panel_body.append('p').text("id : "+ record.id)
        panel_body.append('p').text("ethnicity : "+record.ethnicity)
        panel_body.append('p').text("gender : "+record.gender)
        panel_body.append('p').text("age : "+record.age)
        panel_body.append('p').text("location : "+record.location)
        panel_body.append('p').text("bbtype : "+record.bbtype)
        panel_body.append('p').text("wfreq : "+record.wfreq)
    })

    /* DISPLAYING CHARTS*/
   //Retrieving chart data into arrays
    let samples_rec = samples_data.filter(rec=>rec.id == choice_id)
    let otu_ids = []
    let sample_values = []
    let otu_labels = []
    let otu_ids_labels = []

    samples_rec.map(function (record) {
        //otu_ids, sample_values, otu_labels
        otu_ids = record.otu_ids
        sample_values = record.sample_values
        otu_labels = record.otu_labels
    }
    )

    //Adding 'OTU' legend to otu ids
    for(let i=0; i<10;i++)
    {
        otu_ids_labels[i] = "OTU "+otu_ids[i];
    }

    console.log("otu ids "+otu_ids)
    console.log("sample values "+sample_values)
    console.log("otu labels "+otu_labels)

     /*BAR CHART*/ 
    paint_barChart(otu_ids_labels,sample_values, otu_labels);

     /*BUBBLE*/
    paint_bubbleChart(otu_ids,sample_values, otu_labels);

    /*GAUGE*/
    paint_gaugeChart(washing_freq);
}

/**
* Clear all previous results already displayed in page when selecting a new individual id
*/
function clearResults(){
    //Removing all previous Demographic info
    panel_body.selectAll("p").remove()
    //Bar chart
    d3.select("#bar").selectAll("#bar").remove()
    //Gauge chart
    d3.select("#gauge").selectAll("#gauge").remove()
    //Bubble chart
    d3.select("#bubble").selectAll("#bubble").remove()
}

/**
 * Draws bar chart of top 10 bacteria within user selection
 * @param {string array} otu_ids 
 * @param {string array} sample_values 
 * @param {string array} otu_labels 
 */
function paint_barChart(otu_ids,sample_values, otu_labels){
    var data = [
        {
          "x": sample_values.slice(0,10).reverse(),
          "y": otu_ids.slice(0,10).reverse(),
          "type": 'bar',
          "orientation": 'h',
          "text": otu_labels.slice(0,10)
        }
      ];

    var layout = {
        title: 'Bar Chart'   
    };
      
    Plotly.newPlot('bar', data, layout); 

}

/**
 * Draws bubble chart using all otu_ids, sample values, and otu labels for a given individual
 * @param {string array} otu_ids 
 * @param {string array} sample_values 
 * @param {string array} otu_labels 
 */
function paint_bubbleChart(otu_ids,sample_values, otu_labels){
    var data = [
        {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            //color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            color: otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: sample_values,
        }
    }
    ];

    var layout = {
        title: 'Bubble Chart'   
    };
      
    Plotly.newPlot('bubble', data, layout);
}

/**
 * Function to display gauge chart
 * @param {float} washing_freq Washing hands frequency of selected individual. it displays a gauge chart
 */
function paint_gaugeChart(washing_freq){
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: washing_freq,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge+number",
            range: [0, 9],
            
        }
    ];
    
    var layout = { width: 500, height: 400, 
        margin: { t: 1, b: 1} ,
        xaxis: {
            range: [0, 9]
          }
    };
    Plotly.newPlot('gauge', data, layout);
}





