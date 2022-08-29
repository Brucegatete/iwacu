const express = require("express");

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file")

const postController = require("../controllers/cart");


const router = express.Router();

router.post("/cart", checkAuth, extractFile, postController.addToCart);

router.get("/cart", checkAuth, extractFile, postController.getCartItems);
