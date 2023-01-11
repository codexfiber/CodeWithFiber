const express = require("express");

const cors = require("cors");
const app = express();
app.use((req, res, next) => {
setTimeout(() => next(), 3000);
});

app.use(cors());

app.get("/", (req, res) => {
  res.json({ username: "SIMON" });
  console.log("API called");
});

app.listen(8800, () => {
  console.log("Listening on port 8800");
});
