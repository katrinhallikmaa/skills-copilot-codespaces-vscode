// create web server with express
// http://expressjs.com/en/starter/hello-world.html
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const comments = [
    {
        id: 1,
        name: 'John',
        message: 'Hello world'
    },
    {
        id: 2,
        name: 'Jane',
        message: 'Hi, there'
    }
];

// GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = comments.length + 1;
    comments.push(comment);
    res.json(comment);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        comments[index] = req.body;
        comments[index].id = id;
        res.json(comments[index]);
    } else {
        res.status(404).json({
            error: `Comment with id ${id} not found`
        });
    }
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) {
        const comment = comments.splice(index, 1);
        res.json(comment);
    } else {
        res.status(404).json({
            error: `Comment with id ${id} not found`
        });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


