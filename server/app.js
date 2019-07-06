
//start of module exports
const express = require('express');

//end of module exports

//init app
const port = 3000;
const app = express();
app.listen(port,() => {
    console.log('server Started on port ' + port);
})

//end of app init
 
//begining of routes

//route functions
const home_g = (req,res) => {
    res.send('hello world: This is the campus social home page');
}
//mapping routes to functions
app.get('/',home_g);  
//end of routes
