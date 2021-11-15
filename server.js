var express = require('express')
var http = require('http')
var app = express()
const fetch   = require('node-fetch');


app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
})

http.createServer(app).listen(8001, () => {
  console.log('Server started at http://localhost:8001');
});


app.get('/api/posts', function (req, res) {
    var url = 'https://jsonplaceholder.typicode.com/posts';
        
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // res.on('finish',getComments);
        
        posts = [];

        data.forEach((item, index) => {
            posts.push({
                id: item.id,
                userId: item.userId,
                title: item.title,
                body: item.body,
                comments: []
            });
        });

        // console.log( posts );
        
        res.send({ posts });
    })
    .catch(err => {
        res.send(err);
    });
});
