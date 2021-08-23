
'use strict';

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  url : String,
  email: String,
});

const BookModel = mongoose.model('books', BookSchema);

function seedDataCollection() {
  const book1 = new BookModel({
    title: "-Rich Dad Poor Dad-",
    description:'* Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter.  It advocates the importance of financial literacy, financial independence and building wealth through investing in assets,  real estate investing, starting and owning businesses, as well as increasing ones financial intelligence.',
    status: '* Personal finance, entrepreneurship, business, investing, economics',
    url:'https://m.media-amazon.com/images/I/51bX4hDuBIL.jpg' ,
    email:'dark.lord1122@outlook.sa'
  })

  const book2 = new BookModel({
    title: "-In Search of Lost Time-",
    description:'* Swanns Way, the first part of A la recherche de temps perdu, Marcel Prousts seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. ',
    status: '* Personal',
    url :'https://kbimages1-a.akamaihd.net/011c5826-8da6-49be-9602-866760464c63/1200/1200/False/in-search-of-lost-time-vol-1-7.jpg',
    email:'dark.lord1122@outlook.sa'
  })

  const book3 = new BookModel({
    title: "-One Hundred Years of Solitude-",
    description:'* One of the 20th centurys enduring works, One Hundred Years of Solitude is a widely beloved and acclaimed novel known throughout the world, and the ultimate achievement in a Nobel Prize–winning car ',
    status: '* investing',
    url:'https://images-na.ssl-images-amazon.com/images/I/91mftQtgAkL.jpg',
    email:'dark.lord1122@outlook.sa'
  })
  const book4 = new BookModel({
    title: "-War and Peace-",
    description:'* War and Peace is a literary work mixed with chapters on history and philosophy by the Russian author Leo Tolstoy, first published serially, then published in its entirety in 1869. ',
    status: '* world literature',
    url:'https://kbimages1-a.akamaihd.net/f10f4dd2-a5fc-4049-acb1-c52bb99809a6/1200/1200/False/war-and-peace-148.jpg',
    email:'shamikhq@yahoo.com'
  })

  book1.save();
  book2.save();
  book3.save();
  book4.save();

}
// seedDataCollection(); 


module.exports = BookSchema; 
module.exports = BookModel; 