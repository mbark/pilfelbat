
function drawMap(mapData) {
  $('#map').vectorMap({
    map: 'se_merc_en',
    backgroundColor: '#FBFAF5', /*#e1f7ff*/
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

    onRegionSelected: function(event, label, isSelected) {
      if(isSelected) {
        console.log("Selected " + label);
        $("#stats").text(label);
      } else {
        console.log("Deselected " + label);
      }
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
     },
     onRegionSelected: function(){
        var htmlString = 
          '<div><i class="fa fa-money"></i>Hej</div>'
          /*'<div class="row">'+
            '<div class="col-md-3"><i class="fa fa-money"></i></div>'+
            '<div class="col-md-3"></div>'+
            '<div class="col-md-3"><i class="fa fa-building-o"></i></div>'+
            '<div class="col-md-3"></div>'+
          '</div>'+
          '<div class="row">'+
            '<div class="col-md-3"><i class="fa fa-heartbeat"></i></div>'+
            '<div class="col-md-3"></div>'+
            '<div class="col-md-3"><i class="fa fa-heart-o"></i></div>'+
            '<div class="col-md-3"></div>'+
          '</div>'*/
        $('#stats').html(htmlString);
    }

   });
}