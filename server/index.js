const express = require('express')
const app = express()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const config = require('./config');
const { User, Image, Comment } = require('./models');

mongoose.connect('mongodb://localhost/instagram_klon');

// Activate cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// Enable body parsing
app.use(bodyParser.urlencoded({
  extended: true
}));

// Serve static images
app.use('/public', express.static('public'));

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
        find(req.query).
        populate(['user', 'comment']).
        exec((err, images) => {
            if (err) return handleError(err, res);
            return res.json({ data: images

             });
        });
});

app.get('/api/v1/comments', (req, res) => {
    Comment.
        find({}).
        populate(['user', 'image']).
        exec((err, comments) => {
            if (err) return handleError(err, res);
            return res.json({
                data: {
                    image: undefined,
                    comments: comments,
                }
            });
        });
});

app.post('/api/v1/register', (req, res) => {
  if (!req.body.userName) return res.status(400).send("Missing userName.");
  if (!req.body.password) return res.status(400).send("Missing password.");
  if (!req.body.avatar) return res.status(400).send("Missing avatar.");
  if (!req.body.email) return res.status(400).send("Missing email.");

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  User.create({
    userName : req.body.userName,
    password : hashedPassword,
    avatar : req.body.avatar,
    email : req.body.email,
  }, (err, user) => {
    if (err) return res.status(500).send("There was a problem registering the user.")

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });
    res.status(200).send({ token: token });
  });
});

app.listen(8080, () => console.log('Example app listening on port 8080!'))