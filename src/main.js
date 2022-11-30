require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use("/css", express.static(path.join(__dirname, "../public/css")));
app.use("/js", express.static(path.join(__dirname, "../public/js")));
app.use("/json", express.static(path.join(__dirname, "../public/json")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.all("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/404.html"));
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
