import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

const server = createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log("id", socket.id);
});

const port = 4001;

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
