import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello, Typescript Node Express!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
