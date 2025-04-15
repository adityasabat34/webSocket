import React from "react";
import { io } from "socket.io-client";
import { useEffect } from "react";

const App = () => {
  const socket = io("http://localhost:4001");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("welcome", (data) => {
      console.log(data);
    });
  }, [socket]);
  return <div>App</div>;
};

export default App;
