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
	res.redirect('/htmls/index.html');
});

app.listen(3030, function () {
	console.log('server started...');
});

var rd = readline.createInterface({
	input: fs.createReadStream('/root/logs/testLog.log.2016-06-04'),
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
	console.log(resultArray);
});
