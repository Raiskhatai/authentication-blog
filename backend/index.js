const express = require("express");
require("dotenv").config();
const dns = require("dns");

dns.setServers(["0.0.0.0", "8.8.8.8"]);
const Connect = require("./src/config/db");
Connect();
const cors = require("cors");

const userRouter = require("./src/routes/userRouter");
const blogRouter = require("./src/routes/blogRouter");
const authMiddleware = require("./src/middleware/auth");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.use("/", authMiddleware, blogRouter);

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`this surver is running on port : ${port}`));
