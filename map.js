
function drawMap(mapData) {
  $('#map').vectorMap({
    map: 'se_merc_en',
    backgroundColor: 'transparent', /*#e1f7ff*/
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
        stroke: "#FCFCC9",
        "stroke-width": 4,
      },
      selectedHover: {} // other styles when hovering a selected region
    },
    regionLabelStyle: {
      initial: {
        fill: 'red'
      },
      hover: {
        fill: 'blue'
      }
    },

    //Text on label shown when hovering
    //event.preventDefault(); // remove label 
    onRegionTipShow: function(event, label, code){ 
      label.html('<b>'+label.html()+'s län</b></br>'+ mapData[code]);
    },

    onRegionSelected: function(event, label, isSelected) {
      if(isSelected) {
        console.log("Selected " + label);
        $("#stats").text(label);
      } else {
        console.log("Deselected " + label);
      }
    },
    /*onRegionClick: function(event, code){
      event.preventDefault();
      // your "some code" of region selected
    },*/

    series: {
     regions: [{
         //define the range of color values
         //Blue scale ['#DEEBF7', '#08519C']
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
          '<div class="row">'+
            '<div class="col-md-2"><i class="fa fa-money fa-5x"></i></div>'+
            '<div class="col-md-4">Medelinkomst: '+DATA+'</div>'+
            '<div class="col-md-2"><i class="fa fa-building-o fa-5x"></i></div>'+
            '<div class="col-md-4">Andel sysselsatta: '+DATA+'</div>'+
          '</div>'+
          '<div class="row">'+
            '<div class="col-md-2"><i class="fa fa-heartbeat fa-5x"></i></div>'+
            '<div class="col-md-4">Sjukfall: '+DATA+'</div>'+
            '<div class="col-md-2"><i class="fa fa-heart-o fa-5x"></i></div>'+
            '<div class="col-md-4">Nygifta: '+DATA+'</div>'+
          '</div>'
        $('#stats').html(htmlString);
    }

   });
}

$(document).ready(function() {
  data = [];
  money(function(money) {
    data["money"] = money;
    health(function(health) {
      data["health"] = health;
      drawMap(health);

      console.log(data);
    });
  });
});
