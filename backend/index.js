var express = require("express");
var cors = require("cors");
const http = require("http");
const setupSocket = require('./socket/Socket');
var app = express();
const port = 5000;

const connectToDatabase = require("./db");

app.use(cors());
app.use(express.json());

connectToDatabase();

app.get("/", (req, res) => {
  res.send("Hello Vercel okay");
});

// Routes
app.use("/auth", require("./routes/AuthRoute"));
app.use("/chat", require("./routes/MessageRoute"));

const server = http.createServer(app);

setupSocket(server);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});