var express = require('express');
var app = express();
var test = require('./makeJSON.js');
var fs = require('fs');
var readline = require('readline');
var map = {};
var bodyparser = require('body-parser');
var result = {};
var resultArray = [];

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/htmls', express.static(__dirname + '/htmls'));

app.get('/', function (req, res) {
	res.redirect('/htmls/index2.html');
});

app.route('/getJSON')
	.get(function(req, res) {
	var tempJson = fs.readFileSync(__dirname + '/htmls/test.output');
	res.json(JSON.parse(tempJson));
});

app.listen(3030, function () {
	console.log('server started...');
});

var rd = readline.createInterface({
	input: fs.createReadStream('/root/logs/testLog.log.2016-06-06'),
	output: process.stdout,
	terminal: false
});

rd.on('line', function(line) {
	if(map.hasOwnProperty(line)){
		map[line] = map[line] + 1;
	} else {
		map[line] = 1;	
	}

});


rd.on('close', function() {
	for(var tempString in map){
		if(map.hasOwnProperty(tempString)){
	 result = { "label":tempString, "value":map[tempString] };
	resultArray.push(result);
	}
	
}
	fs.writeFile(__dirname + "/htmls/test.output", JSON.stringify(resultArray));
});



function makeJSON(tempJson) {
	var tempMap = {};
	var tempArray = [];
	tempMap = { "header": {
		"title": {
			"text": "Lots of Programming Languages",
			"fontSize": 24,
			"font": "open sans"
		},
		"subtitle": {
			"text": "A full pie chart to show off label collision detection and resolution.",
			"color": "#999999",
			"fontSize": 12,
			"font": "open sans"
		},
		"titleSubtitlePadding": 9
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasWidth": 590,
		"pieOuterRadius": "90%"
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"hideWhenLessThanPercentage": 3
		},
		"mainLabel": {
			"fontSize": 11
		},
		"percentage": {
			"color": "#ffffff",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 11
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
};

tempMap["data"] = {"sortOrder": "value-desc",
		"content": JSON.parse(tempJson)
		};
	tempArray.push(tempMap);
	console.log(tempMap);

}
