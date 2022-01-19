"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movies = void 0;
const path = require("path");
const fs = require("fs");
const csv = require("csv-parser");
const movies = [];
exports.movies = movies;
fs.createReadStream(path.join(__dirname, '../data/movies.csv'))
    .pipe(csv())
    .on('data', (row) => movies.push(row));
