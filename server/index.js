const path = require("path");
const express = require("express");
// added body parser
const bodyParser = require("body-parser");
const PORT = 31415;

var app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require("./routes/profile"));
app.use(require("./routes/tweet"));
app.use(require("./routes/feed"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("*", (req, res) => {
  res
    .status(404)
    .json({ status: 404, message: "This is not where you want :)." });
});
const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});
