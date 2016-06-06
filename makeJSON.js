var fs = require('fs');

exports.testReturn = function (test) {
	return test + 'this is test!';
};

exports.makeJSON = function (date) {

	var data = fs.readFile('/root/logs/testLog.log.' + date, function(err, data){
		console.log(data.toString());
	});
};

function parse(data) {
	data.split(/\r?\n/);
}
