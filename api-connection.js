var data = {
  "query": [
  {
    "code": "Region",
    "selection": {
      "filter": "vs:RegionLän99EjAggr",
      "values": [
      "01",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "12",
      "13",
      "14",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25"
      ]
    }
  },
  {
    "code": "Kon",
    "selection": {
      "filter": "item",
      "values": [
      "1+2"
      ]
    }
  },
  {
    "code": "Alder",
    "selection": {
      "filter": "item",
      "values": [
      "20-64"
      ]
    }
  },
  {
    "code": "Inkomstklass",
    "selection": {
      "filter": "item",
      "values": [
      "TOT"
      ]
    }
  },
  {
    "code": "ContentsCode",
    "selection": {
      "filter": "item",
      "values": [
      "HE0110K1"
      ]
    }
  },
  {
    "code": "Tid",
    "selection": {
      "filter": "item",
      "values": [
      "2013"
      ]
    }
  }
  ],
  "response": {
    "format": "json"
  }
};

success = function(data) {
	console.log(data);
};

var d = JSON.stringify(data);

$.ajax({
	url: "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/HE/HE0110/HE0110A/SamForvInk2",
	type: "POST",
	data: d,
	success: success,
	dataType: "json"
});

var lanMapping = {
  "SE-O" "14",
  "SE-N" "13",
  "SE-M" "12",
  "SE-K" "10",
  "SE-I" "09",
  "SE-H" "08",
  "SE-G" "07",
  "SE-F" "06",
  "SE-E" "05",
  "SE-D" "04",
  "SE-C" "03",
  "SE-W" "20",
  "SE-Z" "23",
  "SE-Y" "22",
  "SE-X" "21",
  "SE-AC" "24",
  "SE-AB" "01",
  "SE-U"  "19",
  "SE-T"  "18",
  "SE-S"  "17",
  "SE-BD" "25"
};