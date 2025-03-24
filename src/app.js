// This file contains the main  express codes
// Importing express
const {
  RecycleCompany,
} = require("./routes/recycleCompany/recycleCompany.router");
const express = require("express");

const app = express();

app.use(express.json());

app.use("/recycleCompany", RecycleCompany);

module.exports = app;
