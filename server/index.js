const path = require('path');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const config = require('./config');
const { User, Image, Comment } = require('./models');
const verifyToken = require('./verifyToken');

mongoose.connect(config.MONGODB_URI);

// Activate cors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Enable body parsing
app.use(bodyParser.urlencoded({
  extended: true
}));

// Serve static images
app.use('/public', express.static('public'));
app.use('/', express.static('build'));

const handleError = (err, res) => {
  console.log(err);
  return res.send('ERROR! Someting has happened!')
}

// Factory helpers
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

// Data endpoints
app.get('/api/v1/users', verifyToken, (req, res) => {
  User.find({}, (err, users) => {
    if (err) return handleError(err, res);
    return res.json({ data: users });
  });
});

app.get('/api/v1/images', verifyToken, (req, res) => {
  Image.
    find(req.query).
    populate(['user', 'comment']).
    exec((err, images) => {
      if (err) return handleError(err, res);

      let promises = [];
      for (var i=0; i<images.length; i++) {
        let promise = Comment.count({ image: images[i]._id });
        promises.push(promise);
      }

      Promise.all(promises).then((commentCounts) => {
        images = images.map((image, index) => {
          image = image.toObject();
          image.commentCount = commentCounts[index];
          return image;
        });

        return res.json({ data: images });
      });
    });
});

app.get('/api/v1/images/:id', verifyToken, (req, res) => {
  Image.
    findOne({ _id: req.params.id }).
    populate(['user', 'comment']).
    exec((err, image) => {
      if (err) return handleError(err, res);

      return res.json({ data: image });
    });
});

app.post('/api/v1/images/:id/toggle-like', verifyToken, (req, res) => {
  Image.
    findOne({ _id: req.params.id }).
    populate(['user', 'comment']).
    exec((err, image) => {
      if (err) return handleError(err, res);

      let likes = image.likes || [];
      if (likes.indexOf(req.userId) === -1) {
        likes.push(req.userId);
      } else {
        var index = likes.indexOf(req.userId);
        likes.splice(index, 1);
      }
      image.likes = likes;

      image.save((err, data) => {
        return res.json({ data: image });
      });
    });
});


app.get('/api/v1/comments', verifyToken, (req, res) => {
  Comment.
    find(req.query).
    populate(['user', 'image']).
    exec((err, comments) => {
      if (err) return handleError(err, res);
      return res.json({ data: comments });
    });
});

app.post('/api/v1/comments', verifyToken, (req, res) => {
  if (!req.body.text) return res.status(400).send("Missing text.");
  if (!req.body.image) return res.status(400).send("Missing image.");

  Comment.create({
    user: req.userId,
    userName: req.userName,
    image: req.body.image,
    text: req.body.text,
  }, (err, comment) => {
    if (err) return res.status(500).send("There was a problem registering the comment.")

    return res.status(201).send({ comment: comment });
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

    const token = jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: 86400
    });
    return res.status(200).send({ token: token });
  });
});

app.post('/api/v1/login', (req, res) => {
  if (!req.body.password) return res.status(400).send({ message: "Missing password." });
  if (!req.body.email) return res.status(400).send({ message: "Missing email." });

  User.
    findOne({ email: req.body.email }, (err, user) => {
      if (err) throw err;
      if (!user) return res.status(401).send({ message: "Invalid username and/or password." });

      const isValid = bcrypt.compareSync(req.body.password, user.password);
      if (!isValid) return res.status(401).send({ message: "Invalid username and/or password."});

      var token = jwt.sign({ id: user._id, userName: user.userName }, config.SECRET, {
        expiresIn: 86400,  // 24 hours
      });
      return res.status(200).send({ 
        token: token,
        user: {
          userName: user.userName,
          avatar: user.avatar,
          userId: user._id,
        }
      });
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(config.PORT, () => console.log('App listening on port '+config.PORT+'!'))