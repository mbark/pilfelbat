function married(callback) {
	url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101L/CivilstandAndring";
	query = {
		"query": [
		{
			"code": "Region",
			"selection": {
				"filter": "vs:RegionLän07",
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
			"code": "Civilstand",
			"selection": {
				"filter": "item",
				"values": [
				"G"
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

	sendRequest(url, query, function(resp) {
		console.log(resp);
		mapping = {};

		for(i = 0; i<resp.data.length; i++) {
			key = resp.data[i].key[0];
			val = resp.data[i].values[0];

			mapping[indexToLanCode(key)] = val
		}

		callback(mapping);
	});
}