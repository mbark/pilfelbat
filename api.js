var apiUrl = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/HE/HE0110/HE0110A/SamForvInk2";

var query = {
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

var lanCodeToIndex = {
  "SE-O": "14",
  "SE-N": "13",
  "SE-M": "12",
  "SE-K": "10",
  "SE-I": "09",
  "SE-H": "08",
  "SE-G": "07",
  "SE-F": "06",
  "SE-E": "05",
  "SE-D": "04",
  "SE-C": "03",
  "SE-W": "20",
  "SE-Z": "23",
  "SE-Y": "22",
  "SE-X": "21",
  "SE-AC": "24",
  "SE-AB": "01",
  "SE-U": "19",
  "SE-T": "18",
  "SE-S": "17",
  "SE-BD": "25"
};

var indexToLanCodes = {
  "14": "SE-O",
  "13": "SE-N",
  "12": "SE-M",
  "10": "SE-K",
  "09": "SE-I",
  "08": "SE-H",
  "07": "SE-G",
  "06": "SE-F",
  "05": "SE-E",
  "04": "SE-D",
  "03": "SE-C",
  "20": "SE-W",
  "23": "SE-Z",
  "22": "SE-Y",
  "21": "SE-X",
  "24": "SE-AC",
  "01": "SE-AB",
  "19": "SE-U",
  "18": "SE-T",
  "17": "SE-S",
  "25": "SE-BD",
};

function mapLanCodesToValue(resp) {
  mapping = {};

  for(i = 0; i<resp.data.length; i++) {
    key = resp.data[i].key[0];
    val = resp.data[i].values[0];

    mapping[indexToLanCodes[key]] = val
  }

  console.log(mapping);

  return mapping;  
}

function handleResponse(data) {
	console.log(data);

  mapping = mapLanCodesToValue(data);
  drawMap(mapping);
};

$.ajax({
	url: apiUrl,
	type: "POST",
	data: JSON.stringify(query),
	success: handleResponse,
	dataType: "json"
});
