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

function error() {
	console.log("Unbale to perform request");
}

function sendRequest(url, query, callback) {
	$.ajax({
		url: url,
		type: "POST",
		data: JSON.stringify(query),
		success: callback,
		error: error,
		dataType: "json"
	});
}

function findMeanValue(map) {
	sum = 0;
	count = 0;
	for(var key in map) {
		sum = sum + parseInt(map[key]);
		count++;
	}
	return sum/count;
}

function meanValues(data) {
	map = {};
	for(var key in data) {
		map[key] = findMeanValue(data[key]);
	}
	return map;
}

function happinessScore(data, means) {
	map = {};
	for(var k1 in data) {
		score = 0;
		for(var k2 in data[k1]) {
			score = data[k1][k2] / means[k2];
		}
		map[k1] = score;
	}

	return map;
}

function getSortedKeys(obj) {
	var arr = [];
	for(var key in obj) {
		tmp = {};
		tmp[key] = obj[key];
		arr.push(tmp);
	}

	sorted = arr.sort(function(a,b) {
		x = 0;
		y = 0;
		for(var k in a) {
			x = a[k];
		}
		for(var k in b) {
			y = b[k];
		}
		return y-x;
	});

	console.log(sorted);

	rankings = {};
	for(i = 0; i<sorted.length; i++) {
		name = "";
		for(var k in sorted[i]) {
			name = k;
		}

		rankings[name] = i;
	}

	return rankings;
}