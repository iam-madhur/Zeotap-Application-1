const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");
const rulesRoutes = require("./routes/rules"); 
require("./schema"); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/rules", rulesRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "An unexpected error occurred." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
