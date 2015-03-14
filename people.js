function people(callback) {
	url = "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101A/BefolkningNy";
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
				"OG",
				"G",
				"SK",
				"ÄNKL"
				]
			}
		},
		{
			"code": "Kon",
			"selection": {
				"filter": "item",
				"values": [
				"1",
				"2"
				]
			}
		},
		{
			"code": "ContentsCode",
			"selection": {
				"filter": "item",
				"values": [
				"BE0101N1"
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

	success = function(resp) {
	}

	$.ajax({
		url: url,
		type: "POST",
		data: JSON.stringify(query),
		success: success,
		dataType: "json"
	});
};