const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const userSchema = new Schema({
    userName: String,
    avatar: String,
    email: String,
    password: String
});

const imageSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    description: String,
    // TODO: Add created field
    source: String
});

const commentSchema = new Schema({
    image: {type: Schema.Types.ObjectId, ref: 'Image'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    description: String,
});

const User = mongoose.model('User', userSchema);
const Image = mongoose.model('Image', imageSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { User, Image, Comment };
