import http, { IncomingMessage, ServerResponse, Server } from "http";
import fs from "fs";
import path from "path";

function serverHandler(req: IncomingMessage, res: ServerResponse): void {
  const indexPath = path.join(__dirname, "view", "index.html");
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("internal error");
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}

const server: Server = http.createServer(serverHandler);

export default server;
