// create web server with express
const express = require('express');
const app = express();
// create web server with express
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const commentsPath = path.join(__dirname, '../data/comments.json');
// const comments = require('../data/comments.json');
const { v4: uuidv4 } = require('uuid');
// const { getComments, getComment, saveComment, updateComment, deleteComment } = require('../controllers/commentsController');
const { getComments, getComment, saveComment, updateComment, deleteComment } = require('../controllers/commentsController');

// middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// GET /comments
app.get('/', getComments);

// GET /comments/:id
app.get('/:id', getComment);

// POST /comments
app.post('/', saveComment);

// PUT /comments/:id
app.put('/:id', updateComment);

// DELETE /comments/:id
app.delete('/:id', deleteComment);

module.exports = app;