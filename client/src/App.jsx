import React, { useMemo } from "react";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Button, Container, TextField, Typography, Stack } from "@mui/material";

const App = () => {
  const socket = useMemo(() => io("http://localhost:4001"), []);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [roomID, setRoomID] = useState("");
  const [messages, setMessages] = useState([]);

  // console.log(messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && room) {
      socket.emit("message", { message, room });
      setMessage("");
      setRoom("");
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setRoomID(socket.id);
    });

    socket.on("welcome", (data) => {
      console.log(data);
    });

    socket.on("recieve-message", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <Container maxWidth="sm">
      {/* <Typography variant="h1">Web Socket</Typography> */}

      <Typography variant="h6">{roomID}</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="message"
          variant="outlined"
          margin="normal"
        />

        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="roomID"
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>

      {/* <h1>{message}</h1> */}

      <Stack>
        {messages.map((message) => (
          <Typography key={message.id}>{message}</Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
