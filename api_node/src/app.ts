import express from "express";

const app = express();
const port = 5000;

app.post("/create", (req, res) => {
  res.send("");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
