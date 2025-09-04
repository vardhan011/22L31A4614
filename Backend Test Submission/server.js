const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/", urlRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
