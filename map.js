
function drawMap(mapData) {
  $('#map').vectorMap({
    map: 'se_merc_en',
    backgroundColor: '#FFFBED', /*#e1f7ff*/
    regionsSelectable: true,
    regionsSelectableOne: true,
    regionStyle: {
      initial: {
        fill: 'white',
        "fill-opacity": 1,
        stroke: 'black',
        "stroke-width": 2,
        "stroke-opacity": 1
      },
      hover: { // other style when hovering a region
        "fill-opacity": 0.5
      },
      selected: { // other style when a region is selected
        fill: 'yellow'
      },
      selectedHover: {} // other styles when hovering a selected region
    },

    //Text on label shown when hovering
    //event.preventDefault(); // remove label 
    onRegionTipShow: function(event, label, code){ 
      label.html('<b>'+label.html()+'</b></br>'+ mapData[code]);
    },

    series: {
     regions: [{
         //define the range of color values
         scale: ['#DEEBF7', '#08519C'],
         //define the function that maps data to color range polynomial/linear
         normalizeFunction: 'linear',
         //define the coloration method
         attribute: 'fill',
         //define the array of country data
         values: mapData
       }]
     }
   });
}