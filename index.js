const owfs = require("owfs");

exports.init = function(node, app_config, main) {
	var timer = [];

	var get_temperature_interval = function(node, sid) {
		var file = "/" + sid + "/temperature";
		var still_active = null;
		var t = setInterval(function() {
			if (still_active) {
				var diff = (new Date() - d)/1000;
				if (diff < 120) {
					console.log("owfs:", sid,
						"interval still active since",
						still_active);
					return;
				}
			}
			still_active = new Date();
			connection.read(file, function(err, temp) {
				still_active = null;
				if (err) {
					console.error("OWFS", sid, err);
				}
				//console.log(sid, "temperature", +temp);
				if (typeof temp !== "undefined") {
					node.publish(undefined, +temp);
				} else {
					node.publish(undefined, null);
				}
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

			if (c.deactive) return;

			get_temperature_interval(n, sid);

			n.announce([{
				"type": "temperature.data",
				"unit": "C",
				"unit_long": "Celsius"
			}, metadata]);
	});
	connection.dirall("/", function(err, directory) {
		if (err) {
			console.error("owfs Error", err);
			return;
		}
		//console.log(directory);
		directory.forEach(function(file) {
			let sid = file.replace(/^\//, "");
			var n = map.node(sid);
			if (!n) return;
		});
	});

	return [map, timer, connection];
};
