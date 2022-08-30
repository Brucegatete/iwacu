const CartPost = require("../models/cart-post");

exports.addToCart = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const cartPost = new CartPost({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    imagePath: url + "/images/" + req.file.filename
    // creator: req.userData.userId
  });
  cartPost
    .save()
    .then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        cartPost: {
          ...createdPost,
          id: createdPost._id
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Creating a post failed!"
      });
    });
};


exports.getCartItems = (req, res, next) => {
  const postQuery = CartPost.find();
  let fetchedPosts;
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      console.log(fetchedPosts);
      return CartPost.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        cartPosts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Fetching posts failed bruv!"
      });
    });
};
