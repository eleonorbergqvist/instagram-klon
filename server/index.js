const express = require('express')
const app = express()
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/instagram_klon');

const { User, Image, Comment } = require('./models');

const handleError = (err) => {
    console.log(err);
    res.send('ERROR! Someting has happened!')
}

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/actions/create/user', (req, res) => {
    User.create(req.query, (err, user) => {
        if (err) return handleError(err, res);
        return res.json({ data: user });
    })
});

app.get('/actions/create/image', (req, res) => {
    Image.create(req.query, (err, image) => {
        if (err) return handleError(err, res);
        return res.json({ data: image });
    })
});

app.get('/actions/create/comment', (req, res) => {
    Comment.create(req.query, (err, comment) => {
        if (err) return handleError(err, res);
        return res.json({ data: comment });
    })
});

app.get('/api/v1/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return handleError(err, res);
        return res.json({ data: users });
    });
});

app.get('/api/v1/images', (req, res) => {
    Image.
        find({}).
        populate('user').
        exec((err, images) => {
            if (err) return handleError(err, res);
            return res.json({ data: images });
        });
});

app.get('/api/v1/comments', (req, res) => {
    Comment.
        find({}).
        populate(['user', 'image']).
        exec((err, comments) => {
            if (err) return handleError(err, res);
            return res.json({ data: comments });
        });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'))