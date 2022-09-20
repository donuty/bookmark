const mongoose = require('mongoose');
require('dotenv').config();
const dbLink = process.env.ATLAS;

// mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log(err.message));

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

let bookSchema = mongoose.Schema({
  book_title: String,
  book_author: String,
  url: String,
  summary: String,
  readStatus: Boolean
});

let Book = mongoose.model('Book', bookSchema);

let save = (bookData) => {

  let bookObject = {
    book_title: bookData.book_title,
    book_author: bookData.book_author,
    url: bookData.url,
    summary: bookData.summary,
    readStatus: false
  }
  Book.findOneAndUpdate({ book_title: bookData.book_title }, bookObject, { upsert: true })
    .catch(err => {
      console.log('book not added: ', err);
    })

};

let find = () => {

  return Book.find()
    .then((bookList) => {
      return bookList
    })
    .catch(err => {
      console.log('error during book find')
    });

}

let update = (id, updateBook) => {

  return Book.updateOne({ _id: id }, updateBook)
    .catch(err => console.log('update error'));

}


module.exports.Book = Book;
module.exports.save = save;
module.exports.find = find;
module.exports.update = update;