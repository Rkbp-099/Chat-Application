const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname,'/../public')));

app.get('/', function(req, res){
    res.render('index');    
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// console.log(__dirname + '/../public');