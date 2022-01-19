import { Express, Request, Response } from 'express';
import express = require('express');
import * as movies from './utils/getMovie';

const app: Express = express();
const port = process.env.PORT || 3031;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(movies);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
