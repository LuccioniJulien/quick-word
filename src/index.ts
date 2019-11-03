import server from "./server/server.http";
import io from "./server/server.socketio";

io.attach(server);
server.listen(8081);
console.log("Server Listening");
