require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.all("*", (req, res) => {
	res.send("Hello World!");
});

// Start the app
(async () => {
	await mongoose.connect(process.env.MONGODB, { family: 4 }, (err) => {
		if (err != null) {
			console.log(err);
			process.exit(1);
		}
		console.log("Connected to the database");
	});
	await app.listen(process.env.PORT, () => {
		console.log("Started express app");
	});
})();
