const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(__dirname));

app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var foods = [
  { "id": 1, "name": "Donuts" },
  { "id": 2, "name": "Pizza" },
  { "id": 3, "name": "Tacos" }
];

var books = [
  { "title": "Hitchhiker's Guide to the Galaxy" },
  { "title": "The Fellowship of the Ring" },
  { "title": "Moby Dick" }
];

var movies = [
  { "title": "Ghostbusters" },
  { "title": "Star Wars" },
  { "title": "Batman Begins" }
];

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'/dist/index.html'))
});

app.get('/api/books', function (req, res) {
    res.send(books);
});

app.get('/api/movies', function (req, res) {
    res.send(movies);
});

app.get('/api/food', function (req, res) {

    console.log("GET foods");

    res.send(foods);

});

app.post('/api/food', function (req, res) {

    console.log("POST food: " + req.body.name);

    let id = 1;
    if (foods.length > 0) {
        let maximum = Math.max.apply(Math, foods.map(function (f) { return f.id; }));
        id = maximum + 1;
    }

    let new_food = {"id": id, "name": req.body.name};

    foods.push(new_food);

    res.send(new_food);

});

app.put('/api/food/:id', function (req, res) {

    console.log("PUT food: " + req.params.id);


    let id = req.params.id;

    let f = foods.find(x => x.id == id);

    f.name = req.body.name;

    res.send(f);

});

app.delete('/api/food/:id', function (req, res) {

    console.log("DELETE food: " + req.params.id);

    let id = req.params.id;

    let f = foods.find(x => x.id == id);

    foods = foods.filter(x => x.id != id);

    res.send(f);
});


// HTTP listener
app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});
module.exports = app;