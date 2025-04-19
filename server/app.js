import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST"],
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
  console.log("a user connected", socket.id);
  //   console.log("id", socket.id);
  //   socket.emit("welcome", `Hello from the server`);
  //   socket.broadcast.emit("welcome", `${socket.id} joined the server`);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  socket.on("message", ({ room, message }) => {
    console.log({ message, room });
    io.to(room).emit("recieve-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("joined room", room);
  });
});

const port = 4001;

server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
