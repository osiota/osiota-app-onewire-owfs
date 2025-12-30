const owfs = require("owfs");

exports.init = function(node, app_config, main) {
	const timer = [];

	const connection = new owfs.Client(
		app_config.host || 'localhost',
		app_config.port || 4304
	);

	let cancel_fn = null;
	const p_cancel = new Promise((resolve, reject)=>{
		cancel_fn = ()=>{
			reject("canceled");
		};
	});

	function read(file) {
		const p = new Promise((resolve, reject)=>{
			const read_tid = setTimeout(()=>{
				reject(new Error("OWFS Timed out"));
			}, 4000);
			connection.read(file, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
				clearTimeout(read_tid);
			});
			timer.length = 0;
			timer.push(read_tid);
		});
		return Promise.race([p, p_cancel]);
	}

	async function read_interval(directory) {
		for (const file of directory) {
			const sid = file.replace(/^\//, "");
			const n = map.node(sid);
			if (!n) return;

			try {
				console.log("READ", sid);
				let temp = await read(file + "/temperature");
				console.log("TEMP", sid, temp);
				if (typeof temp === "string") {
					temp = +temp;
				}
				node.publish(undefined, +temp);
			} catch(err) {
				if (err === "canceled") return;
				console.error("OWFS", sid, err);
			}
		}
		timer.push(
			setTimeout(read_interval.bind(null, directory),
				(app_config.interval || 5) * 1000
			)
		);
	}

	var map = node.map(app_config.map, null, true, undefined,
		function(n, metadata, c) {
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
		read_interval(directory);
	});

	return [cancel_fn, map, timer, connection];
};
