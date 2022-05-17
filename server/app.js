const express = require("express");
const app = express();
const port = process.env.PORT || 3031;
const movies = require("./helpers/getMovie");
const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send(JSON.stringify(movies));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
