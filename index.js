const owfs = require("owfs");

exports.init = function(node, app_config, main) {
	var timer = [];

	var get_temperature_interval = function(node, sid) {
		var file = "/" + sid.replace(/-/, ".") + "/temperature";
		var t = setInterval(function() {
			connection.read(file, function(err, temp) {
				//console.log(sid, "temperature", temp);
				node.publish(undefined, temp);
			});
		}, (app_config.interval || 5) * 1000);
		timer.push(t);
	};

	var connection = new owfs.Client(
		app_config.host || 'localhost',
		app_config.port || 4304
	);

	var map = node.map(app_config.map, null, true, undefined,
		function(n, metadata, c) {
			var sid = c.map;

			get_temperature_interval(n, sid);

			n.announce([{
				"type": "temperature.data",
				"unit": "C",
				"unit_long": "Celsius"
			}, metadata]);
	});
	connection.dirall("/", function(err, directory) {
		if (err) {
			console.error("owfs Error", err.stack || err);
			return;
		}
		//console.log(directory);
		directory.forEach(function(file) {
			let sid = file.replace(/^\//, "")
					.replace(/\./, "-");
			var n = map.node(sid);
			if (!n) return;
		});
	});

	return [map, timer, connection];
};
