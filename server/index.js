// server/index.js
const {port} = require("./config.json");
const express = require("express");

const app = express();

app.get("/api", (req, res) => {
    res.json({message:"Hello from express!"});
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});