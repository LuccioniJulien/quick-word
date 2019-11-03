import socketio from "socket.io";

const io = socketio();

io.on("connection", socket => {
  console.log("connection");
  socket.emit("news", { hello: "world" });
  socket.on("my other event", data => {
    console.log(data);
  });
});

export default io;