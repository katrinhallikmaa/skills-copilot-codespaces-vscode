// Create web server

// Import statements
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Create web server
const app = express();

// Set port
const port = 3000;

// Set directory for static files
app.use(express.static(path.join(__dirname, 'public')));

// Set directory for views
app.set('views', path.join(__dirname, 'views'));

// Set view engine
app.set('view engine', 'ejs');

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Import comments
const comments = require('./comments.json');

// GET /comments
// Display comments
app.get('/comments', (req, res) => {
    res.render('comments', {
        title: 'Comments',
        comments: comments
    });
});

// POST /comments
// Add new comment
app.post('/comments', (req, res) => {
    // Get comment from request body
    const comment = req.body;
    // Add comment to comments array
    comments.push(comment);
    // Write comments to comments.json
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Comments saved to comments.json');
        }
    });
    // Redirect to /comments
    res.redirect('/comments');
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});