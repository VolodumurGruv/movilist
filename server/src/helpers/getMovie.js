const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const movies = [];

fs.createReadStream(path.join(__dirname, "../../../movies/movies.csv"))
  .pipe(csv())
  .on("data", (row) => movies.push(row));

module.exports = movies;
