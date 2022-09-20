const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const { Book, save, find, update } = require('../database/db.js');
const axios = require('axios');
const token = process.env.TOKEN;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3011;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: false }));


let apiQuery = (author) => {

  let options = {
    method: 'GET',
    url: `https://api.nytimes.com/svc/books/v3/reviews.json?author=${author}&api-key=${token}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${token}`
    }
  };

  return axios(options.url, options.headers)
    .then(res => res.data)
    .catch(err => console.log('error in axios.get', err));

};

app.get('/books', (req, res) => {
  Book.find({})
    .then(results => {
      res.json({ results: results });
    })
    .catch(err => {
      console.log('error finding books at app.get');
      res.status(400)
    })
});

app.get('/books/:id', function (req, res) {
  Book.deleteOne({ _id: req.params.id })
    .then((results) => {
      res.sendStatus(201);
    })
    .then(() => {
      console.log('this book has been removed from the list');
    })
    .catch(err => console.log('deleteOne error'));
});

app.post('/books', function (req, res) {

  const bookQuery = req.body.search;
  var authorQuery = bookQuery.split(' ').join('%20');
  // https://api.nytimes.com/svc/books/v3/reviews.json?author=Lisa%20Ko&api-key=[YOUR_API_KEY]'

  apiQuery(authorQuery)
    .then(results => {
      var searchResults = results.results;
      searchResults.forEach((eachBook) => {
        save(eachBook);
      })
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('error after apiQuery in app.post');
      res.status(400)
    })

});

app.put('/books/:id', function (req, res) {
  var bookId = req.params.id;
  var bookToUpdate = Book({
    _id: req.params.id,
    readStatus: req.body.readStatus
  });
  update(bookId, bookToUpdate)
    .then(() => { res.sendStatus(201)})
    .catch(err => console.log('error at app.put/books:id'));
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


