const express = require("express");

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file")

const postController = require("../controllers/cart");


const router = express.Router();

router.post("", checkAuth, extractFile, postController.addToCart);

router.get("", checkAuth, extractFile, postController.getCartItems);

module.exports = router;
