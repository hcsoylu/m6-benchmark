const express = require("express");
const Review = require('../../db').Review
const router = express.Router();

router
  .route("/reviews")
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findAll()
      res.send(reviews)
    } catch (e) {
      console.log(e);
      next(e);
    }
  })

module.exports = router;