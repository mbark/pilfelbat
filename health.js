function health(callback, people) {
	url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/SF/SF0203/PSjukfallAlder";
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
				"SAMA"
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
		mapping = {};

		for(i = 0; i<resp.data.length; i++) {
			key = resp.data[i].key[0];
			val = people[indexToLanCode(key)] - resp.data[i].values[0];

			mapping[indexToLanCode(key)] = val;
		}

		callback(mapping);
	});
}