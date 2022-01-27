const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const movies = [];

//fs
//  .createReadStream(path.join(__dirname, "../../movies/movies.csv"))
//  .pipe(csv())
//  .on("data", (row) => movies.push(row));

  fs.readFile(path.join(__dirname, "../../movies/movies.csv"), "utf-8", (err, res) => {
    if(err) {
      const error = new Error("File wasn't read")
      console.error(err);
      console.error(error)
      throw err;
    }
    movies.push(res.toString().split('\n '));
    console.log(movies[0]);
  })

  module.exports = movies;
