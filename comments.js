// create web server with express
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Comment } = require("../models");
const { asyncHandler } = require("../utils");

// GET /comments/:id
// return all comments for a given book
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const comments = await Comment.findAll({
      where: { bookId: req.params.id },
    });
    res.json(comments);
  })
);

// POST /comments
// create a new comment
router.post(
  "/",
  [
    check("comment").exists().withMessage("Please provide a comment"),
    check("bookId").exists().withMessage("Please provide a bookId"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      res.status(400).json({ errors: errorMessages });
    } else {
      const comment = await Comment.create(req.body);
      res.status(201).json(comment);
    }
  })
);

module.exports = router;
