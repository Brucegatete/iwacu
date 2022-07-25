const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const path = require("path");

const { title } = require('process');

const postRoutes = require('./routes/posts')

const app = express();

mongoose.connect('mongodb+srv://bruce:yyYJvDICXwgUf6GP@cluster0.dch3m.mongodb.net/iwacu-db?retryWrites=true&w=majority')
  .then(()=> {
    console.log('Connected to the database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.options('*', cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts/", postRoutes);
module.exports = app;
