import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = 4001;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
