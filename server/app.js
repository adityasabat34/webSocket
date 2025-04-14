import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// app.use(cors(corsOptions));
const server = createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log("id", socket.id);
});

const port = 4001;

server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
