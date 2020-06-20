// const http = require("http");
// const app = require("./app");

// const port = 9000;

// const server = http.createServer(app);

// server.listen(port);

const http = require("http");
const path = require("path");
const express = require("express");
const app = express();

const serverApp = require("./app");
const serverPort = 9000;

const publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("ui is ready");
});

const server = http.createServer(serverApp);
//server.listen(serverPort);
server.listen();
