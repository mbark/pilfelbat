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

function indexToLanCode(i) {
	return indexToLanCodes[i];
}

function sendRequest(url, query, callback) {
	$.ajax({
		url: url,
		type: "POST",
		data: JSON.stringify(query),
		success: callback,
		dataType: "json"
	});
}
