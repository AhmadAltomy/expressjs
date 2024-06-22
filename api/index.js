const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const router = require("./router");
require("./config");

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api", router);

app.listen(process.env.PORT || 8080, () => {
  console.log("App is running on port", process.env.PORT || 8080);
});

module.exports = app;