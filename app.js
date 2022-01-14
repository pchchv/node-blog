const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const { render } = require('express/lib/response');
const blogRoutes = require('./routes/blogRotes');

// express app
const app = express();

let pass = fs.readFileSync("login.txt", "utf8");
//connect to mongodb
const dbURI = `mongodb+srv://blog:${pass}@nodetuts.ufztg.mongodb.net/node-tuts?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

//  middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
// blog routes
app.use(blogRoutes);
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});