
//start of module exports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// custom modules
const config = require('./config/database');
//end of module exports

//setup db connection
mongoose.connect(config.database,{ useNewUrlParser: true })
    .then(() => {
        console.log('successfully connected to mongodb');
    })
    .catch((err)=>{
        console.log('an error occured and the error is as follows');
        console.log(err);
    });
const db = mongoose.connection;

// import DB models
const Posts = require('./models/post.js');
//end of db setup


//init app
const port = 3000;
const app = express();
app.listen(port,() => {
    console.log('server Started on port ' + port);
})

//end of app init

//start of middleware
app.use(express.static(path.join(__dirname,'public'))); //setup static folder

//body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//end of middleware

//begin Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//end of loading view engine

 
//begining of routes

//route functions
const home_g = (req,res) => {
    // posts = Posts.find({},(err,posts) => {
    Posts.find({},(err,posts) => {
            if(err){
            console.log(err);
          } else {
            // console.log(posts);
           res.render('home',{
               posts: posts
           });
          }
    });
    // console.log(posts);
    // res.send('hello world: This is the campus social home page');
    // res.render('home');

}

//mapping routes to functions
app.get('/',home_g); 

//bringing routes from routes folder
const posts = require('./routes/posts');
app.use('/posts',posts);

const api = require('./routes/api/posts');
app.use('/api',api);
//end of routes

//other functions
const getPosts = () => {
    Posts.find({},(err,posts) => {
        if(err){
            console.log(err);
          } else {
            return posts;
          }
    });
}

