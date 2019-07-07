const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    title: String,
    body: String
});

const Posts = module.exports = mongoose.model('Post',PostsSchema);