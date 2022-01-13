const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');

// express app
const app = express();

let pass = fs.readFileSync("login.txt", "utf8");
//connect to mongodb
const dbURI = `mongodb+srv://blog:${pass}@nodetuts.ufztg.mongodb.net/node-tuts?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) =>console.log('connected to db'))
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

//  middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('new request made: ');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

app.get('/', (req, res) => {
    const blogs = [];
    res.render('index', { title: 'Home' , blogs});
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog'});
});
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});