const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const path = require("path");
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');

const app = express()


mongoose.connect('mongodb+srv://bruce:jR7A4Bw86YHEFg5p@cluster0.dch3m.mongodb.net/iwacu-db')
  .then(()=> {
    console.log('Connected to the database!');
    console.log(process.env.MONGO_ATLAS_PW);
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
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts/", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;
