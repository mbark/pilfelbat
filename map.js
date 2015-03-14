function mergeData(data) {
  map = {};
  for (var key in data["people"]) {
    if(map[key] === undefined) {
      map[key] = {};
    }
    for(k2 in data) {
      map[key][k2] = data[k2][key];
    }
  }

  return map;
}

function drawMap(data) {
  means = meanValues(data);
  mergedData = mergeData(data);
  mapData = data["people"];
  regionName = "";
  happiness = happinessScore(mergedData, means);

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
        fill: "#01AEA1",
        //stroke: "#FCFCC9",
        //"stroke-width": 4,
      },
      selectedHover: {} // other styles when hovering a selected region
    },

    //Text on label shown when hovering
    //event.preventDefault(); // remove label 

    onRegionTipShow: function(event, label, code){   
      if (label.html() == 'Orebro') { 
        regionName = 'Örebro';
        label.html('<div id="tooltip"><b>Örebros län</b></br> Score: '+ happiness[code].toFixed(3)); //Set label text
      }
      else{
        regionName = label.html();
        label.html('<div id="tooltip"><b>'+label.html()+'s län</b></br> Score: '+ happiness[code].toFixed(3));
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
         values: happiness
       }]
     },

     onRegionSelected: function(event, label, isSelected){
      if(!isSelected) {
        return;
      }

      regionData = mergedData[label];
      income = regionData["money"];
      people = regionData["people"];
      working = (regionData["work"]/people*100).toFixed(1);
      unhealthy = (regionData["health"]/people*100).toFixed(1);
      newlyMarried = (regionData["married"]/people*100).toFixed(1);

      var htmlString = 
      '<div class="row" style="margin-bottom:75px;">'+
      '<div class="col-md-12"><h2>Statistik för <b>'+regionName+'s län</b></h2>'+
      '<h3>Antal invånare: '+people+'</h3></div>'+
      '</div>'+
      '<div class="row" style="margin-bottom:50px;">'+
      '<div class="col-md-2"><i class="fa fa-money fa-5x vertcenter turqcolor"></i></div>'+
      '<div class="col-md-4" style="padding-left: -16px; padding-right: -16px;"><p class="vertcenter"><b>Medelinkomst: </b><br/>' + income + '00 SEK</p></div>'+
      '<div class="col-md-2"><i class="fa fa-building-o fa-5x vertcenter turqcolor" style="margin-left:7.5px;"></i></div>'+
      '<div class="col-md-4" style="padding-left: -16px; padding-right: -16px;"><p class="vertcenter"><b>Andel sysselsatta: </b><br/>' + working + '%</p></div>'+
      '</div>'+
      '<div class="row">'+
      '<div class="col-md-2"><i class="fa fa-heartbeat fa-5x vertcenter turqcolor"></i></div>'+
      '<div class="col-md-4" style="padding-left: -16px; padding-right: -16px;"><p class="vertcenter"><b>Antal friska: </b>' + unhealthy + '%</p></div>'+
      '<div class="col-md-2"><i class="fa fa-heart-o fa-5x vertcenter turqcolor"></i></div>'+
      '<div class="col-md-4" style="padding-left: -16px; padding-right: -16px;"><b><p class="vertcenter" id="married">Nygifta: </b>' + newlyMarried + '%</p></div>'+
      '</div>'
      $('#stats').html(htmlString);
    }

  });
}

$(document).ready(function() {
  data = {};
  money(function(money) {
    data["money"] = money;
    people(function(people) {
      data["people"] = people;
      health(function(health) {
        data["health"] = health;
        married(function(married) {
          data["married"] = married;
          work(function(work) {
            data["work"] = work;
            drawMap(data);
          });
        });
      }, people);
    });
  });
});
