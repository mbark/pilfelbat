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

  happinessRankings = getSortedKeys(happiness);

  $('#map').vectorMap({
    map: 'se_merc_en',
    backgroundColor: 'transparent',
    zoomButtons : false,
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
        fill: "#ffbba1",
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
        label.html('<div id="tooltip"><b>Örebros län</b></br> Lyckoscore: '+ happiness[code].toFixed(3)); //Set label text
      }
      else{
        regionName = label.html();
        label.html('<div id="tooltip"><b>'+label.html()+'s län</b></br> Lyckoscore: '+ happiness[code].toFixed(3));
      }
    },

    series: {
     regions: [{
         //define the range of color values
         //Blue scale ['#DEEBF7', '#08519C']
         //Green/teal scale ['#F5FFFA', '#008080']
         scale: ['#F5FFFA', '#008080'],
         //define the function that maps data to color range polynomial/linear
         normalizeFunction: 'polynomial',
         //define the coloration method
         attribute: 'fill',
         //define the array of country data
         values: happiness,
         legend: {
          vertical: true,
          cssClass: 'jvectormap-legend-icons'
          }
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
      healthy = (regionData["health"]/people*100).toFixed(1);
      newlyMarried = (regionData["married"]/people*100).toFixed(1);
      happinessRank = happinessRankings[label];

      $.ajax({ 
        url: "infoBox.html",
        dataType: "html",
      }).done(function(responseHtml) {
       $("#stats").html(responseHtml);
       $("#people").text("Antal invånare: " + people);
       $("#income").text(income*1000 + " SEK / år");
       $("#working").text(working + "%");
       $("#healthy").text(healthy + "%");
       $("#newlyMarried").text(newlyMarried + "%");
       $("#rank").text('#' + (happinessRank+1));
       $("#region-name").text(regionName + "s län");
     });
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
