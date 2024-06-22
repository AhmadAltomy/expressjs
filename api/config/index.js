const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://anastoumi:T8ltndHerPa7cr8F@cluster0.24fuz4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
