//start of module exports
const express = require('express');
const router = express.Router();

//end of module exports

// import DB models
const Post = require('../models/post.js');
//end of db setup

//routes
//route functions
const get_post_g = (req, res) => {
    const id = req.params.id;
    Post.findById(id,(err,post)=>{
        if (err){
            console.log(err);
        }
        else{
            res.render('post',{
                post: post
            });
        }
    });
    
}

const add_post_p = (req,res) => {
    const post = new Post();
    post.title = req.body.title;
    post.body = req.body.body;
    post.image = req.body.image;
    post.save((err)=>{
        if (err){
            console.log(err);
            return;
        }
        else{
            res.redirect('/');
        }
    });

}
//mapping routes to functions
router.get('/:id',get_post_g);
router.post('/add',add_post_p);
//end of routes


module.exports = router;
