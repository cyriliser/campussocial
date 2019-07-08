const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String
});

const Post = module.exports = mongoose.model('Post',PostsSchema);