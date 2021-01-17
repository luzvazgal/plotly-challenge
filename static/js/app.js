//Allocating individual's names

d3.json("../../data/samples.json").then(function(bacteriaData) {

    //console.log(bacteriaData.names)
    let selectList = d3.select('#selDataset')

    //Adding list of ids to select option
    selectList.selectAll('option')
    .data(bacteriaData.names)
    .enter()
    .append('option')
    .text(id=>id)

    
})



