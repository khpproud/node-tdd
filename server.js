const express = require("express");

// Constants
const PORT = process.env.PORT || 3000;

// App
const app = express();
app.use(express.json());
const productRoutes = require("./routes");
const mongoose = require("mongoose");

// DB Connect
mongoose
  .connect(
    `mongodb+srv://<name>:<password>@studying.nmbi9.mongodb.net/Studying?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDb connected..."))
  .catch((e) => console.error(e));

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  console.log("Hello world");
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const server = app.listen(PORT, () =>
  console.log(`Sserver is running on port :${PORT}`)
);

module.exports = app;
module.exports.server = server;
