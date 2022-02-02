const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const movies = [];
const movies1 = {};

//fs
//  .createReadStream(path.join(__dirname, "../../movies/movies.csv"))
//  .pipe(csv())
//  .on("data", (row) => movies.push(row));

fs.readFile(
  path.join(__dirname, "../../movies/movies.csv"),
  "utf-8",
  (err, res) => {
    if (err) {
      const error = new Error("File wasn't read");
      console.error(err);
      console.error(error);
      throw err;
    }

    const header = getKeysFromBuffer(res);
    const body = getValuesFromBuffer(res);

    // console.log(nextChunk(header, body));
    movies.push(nextChunk(header, body));

    // console.log(movies);
  }
);

module.exports = movies;

function getKeysFromBuffer(str) {
  // for csv files
  return str.toString().split("\n").splice(0, 1).join(", ").split(",");
}

function getValuesFromBuffer(str) {
  return str.toString().split("\n").splice(1).join(", ").split(",");
}

function nextChunk(arr1, arr2) {
  const tempArr = arr2.splice(0, arr1.length);
  let obj = {};
  console.log(arr2.length <= 0);
  if (arr2.length <= 0) {
    console.log("work");
    return movies;
  }
  for (let i = 0; i < arr1.length; i++) {
    obj[arr1[i]] = tempArr[i];
  }
  movies.push(obj);
  return nextChunk(arr1, arr2);
}
