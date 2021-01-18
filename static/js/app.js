var meta_data = []
var samples_data = []

/* Initializing objects where the results will be displayed*/
//Panel 
let panel_body = d3.select("#sample-metadata")
//Bar chart
let bar = d3.select("#bar")
//Gauge chart
let gauge = d3.select("#gauge")
//Bubble chart
let bubble = d3.select("#bubble")

//Allocating individual's ids to be selected in dropdown menu
d3.json("../../data/samples.json").then(function(bacteriaData) {

    //Assigning json metadata record to a dictionary
    meta_data = bacteriaData.metadata
    samples_data = bacteriaData.samples

    console.log("Adentro " + meta_data.length)
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
  
    //Clearing all previous Results
    clearResults()
 
    /*DEMOGRAPHIC INFO*/
    //Getting the record from metadata corresponding to the user's selected id
    let metadata_rec = meta_data.filter(rec=>rec.id== parseInt(choice_id))

    //Displaying info according the selected option 
    metadata_rec.forEach(function (record){
        //console.log (`Record ${ record.id}`)
        panel_body.append('p').text("id : "+ record.id)
        panel_body.append('p').text("ethnicity : "+record.ethnicity)
        panel_body.append('p').text("gender : "+record.gender)
        panel_body.append('p').text("age : "+record.age)
        panel_body.append('p').text("location : "+record.location)
        panel_body.append('p').text("bbtype : "+record.bbtype)
        panel_body.append('p').text("wfreq : "+record.wfreq)
    })

    /*BAR CHART*/ 
    let samples_rec = samples_data.filter(rec=>rec.id == choice_id)
    let otu_ids = []
    let sample_values = []
    let otu_labels = []

    samples_rec.map(function (record) {

        //otu_ids, sample_values, otu_labels
        otu_ids = record.otu_ids.slice(0,10)
        sample_values = record.sample_values.slice(0,10)
        otu_labels = record.otu_labels.slice(0,10)
    }
    )

    console.log("otu_ids "+otu_ids)

     /*BUBBLE*/


    /*GAUGE*/

   

    
}

/**
* Clear all previous results when selecting a new individual id
*/
function clearResults(){
    //Removing all previous Demographic info
    panel_body.selectAll("p").remove()
    //Bar chart
    bar.selectAll("#bar").remove()
    //Gauge chart
    gauge.selectAll("#gauge").remove()
    //Bubble chart
    bubble.selectAll("#bubble").remove()
}






//console.log(demog_labels)




