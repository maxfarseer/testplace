var fs = require('fs'),
	async = require('async'),
	__oldSkuDir = './old/',
    __newSkuDir = './new/';

async.waterfall([
	function checkDir(callback) {
		fs.readdir(__oldSkuDir, function(err, files) {
			callback(err, files);
		});
	}, function getName(files, callback) {
        files.forEach(function(name) {
            console.log('Будет обработан: ' + __oldSkuDir + name);
            callback(null, name)
        });
    }, function checkFiles(name, callback) {
        fs.stat(__oldSkuDir + name, function(err, stats) {
            callback(err, stats, name);
        });
    }, function readData(stats, name, callback) {
        if (stats.isFile()) {
            fs.readFile(__oldSkuDir + name, 'utf8', function(err, data) {
                callback(err, name, data);
            });
        }
    }, function editData1(name, data, callback) {
        var newData = data.replace(/\s*([a-z0-9]+)\s*,/gi,'<product sku="$1" />\n');
        callback(null, name, newData);
    }, function editData2(name, data, callback) {
        var newData = data.replace(/\{\{ modules\.cms_products\(sku='/g, '<!-- START -->\n');
        callback(null, name, newData);
    }, function editData3(name, data, callback) {
        var newData = data.replace(/\s*(\w{12}\s*)'\s*\)\s*}}/,'\n<product sku="$1" />\n<!-- END -->');
        callback(null, name, newData);
    }, function writeData(name, newData, callback) {
        var newSkuFile = ''+__newSkuDir + name;
        fs.writeFile(__newSkuDir + name, newData, 'utf8', function(err) {
            callback(err, newSkuFile);
        });
    }

], function(err, result) {
	if (err) throw err;
    console.log('Добавлен: ' + result);
});