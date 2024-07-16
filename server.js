const express = require("express");
const app = express();
const router = require("./Routes/router.js");
require("dotenv").config();

port = process.env.PORT || 3000;

app.use("/emailer", router);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
