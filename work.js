function work(callback) {
	url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/AM/AM0401/AM0401N/NAKUSysselAnkLAr";
	query = {
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
			"code": "Anknytningsgrad",
			"selection": {
				"filter": "item",
				"values": [
				"SYSTOT"
				]
			}
		},
		{
			"code": "ContentsCode",
			"selection": {
				"filter": "item",
				"values": [
				"AM0401VJ"
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
			val = resp.data[i].values[0]*100;

			mapping[indexToLanCode(key)] = val
		}

		callback(mapping);
	});
}