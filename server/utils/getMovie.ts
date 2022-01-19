import path = require('path');
import fs = require('fs');
import csv = require('csv-parser');

import { Movie } from '../../src/app/interfaces/movie.interface';

const movies: Movie[] = [];

fs.createReadStream(path.join(__dirname, '../data/movies.csv'))
  .pipe(csv())
  .on('data', (row: Movie) => movies.push(row));

export { movies };