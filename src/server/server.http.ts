import http, { IncomingMessage, ServerResponse, Server } from "http";
import fs from "fs";
import path from "path";

function serverHandler(req: IncomingMessage, res: ServerResponse): void {
  console.log(req.url);
  const file = req.url === "/" ? "index.html" : (req.url || "").slice(0);
  const indexPath = path.join(path.resolve(), "static", file);
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
