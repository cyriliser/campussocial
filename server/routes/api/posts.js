//start of module exports
const express = require('express');
const router = express.Router();

//end of module exports

// import DB models
const Post = require('../../models/post.js');
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
           res.json(post);
        }
    });
    
}

const add_post_p = (req,res) => {

    const post = new Post();
    post.title = req.body.title;
    post.body = req.body.body;
    post.image = req.body.image;

    post.save((err,post)=>{
        if (err){
            console.log(err);
            return;
        }
        else{
            res.status(201);
            res.json(post);
            return;
        }
    });

}

const get_posts_g = (req,res)=>{
    Post.find({},(err,posts) => {
        if(err){
            console.log(err);
        } else {
            res.json(posts);
        }
    });
}

const api_g = (req, res) => {
    res.json([
        //api/
        {
            url: 'api/',
            title: 'root of api',
            methods: [{name: 'GET',purpose:'has details about api endpoints'}],
        },
        //api/posts
        {
            url: 'api/posts',
            title: 'posts',
            methods: [{name: 'GET',purpose:'for getting all the posts'}],
        },
        //api/posts/add
        {
            url: 'api/posts/add',
            title: 'posts',
            methods: [{name: 'POST',purpose:'Adding a new Post'}],
            desc: "take in a json object with title,body,image and returns 201 status and the new object from the db"
        },
        //api/posts/:id
        {
            url: 'api/posts/:id',
            title: 'post',
            methods: [{name: 'GET',purpose:'for getting one post using id'}],
        }
    ]);
}

const delete_post_d = (req, res) =>{
    const id = req.params.id;
    Post.findByIdAndRemove(id)
        .then(()=>{
            res.status(200);
            res.send('post deleted');
        })
        .catch(err => {
            console.log(`\nan error occured while deleteing post with id :${id}, \nthe error is as follows:\n${err}\n`);
            res.status(500);
            res.send('server error, post may not be deleted');
        });
    
}


const edit_post_g = (req,res)=>{
    return null;
}
//mapping routes to functions
router.get('/',api_g)
router.get('/posts',get_posts_g)
router.get('/posts/:id',get_post_g);
router.post('/posts/add',add_post_p);
router.delete('/posts/delete/:id',delete_post_d);
// router.get('/posts/edit/:id',edit_post_g);
// router.post('/posts/edit/:id',edit_post_p);
//end of routes




module.exports = router;
