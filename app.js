const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);

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