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
    Post.findById(id)
        .then((post)=>{
            // console.log(`\nFrom then: This is the Post:\n ${post}\n`);
            res.render('post',{
                post: post
            });
        })
        .catch((err)=>{
            console.log(`\nFrom catch: This is the error:\n ${err}\n`);
            res.redirect(`/posts/`)
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

const update_post_p = (req,res)=>{
    let post = {};
    post.title = req.body.title;
    post.body = req.body.body;
    post.image = req.body.image;

    const id = req.params.id;
    Post.findByIdAndUpdate(id,post,{new:true})
        .then((newpost)=>{
            res.redirect(`/posts/${id}`,204,{post:newpost});
        })
        .catch((err)=>{console.log(err);});

}
//mapping routes to functions
router.get('/:id',get_post_g);
router.post('/add',add_post_p);
// router.get('/update/:id',update_post_g);
router.post('/update/:id',update_post_p);
//end of routes


module.exports = router;
