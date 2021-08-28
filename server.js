"use strict";

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const server = express();
const PORT = process.env.PORT;
server.use(cors());
server.use(express.json());

// const mongoVar= process.env.MONGO_LINK  , put the a .... and dffdasdsad loc;
mongoose.connect(`${process.env.DB_LINK}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BookSchema = require("./model/BookSchema.js");

const BookModel = mongoose.model("books", BookSchema);

// function seedDataCollection() {
//   const book1 = new BookModel({
//     title: "-Rich Dad Poor Dad-",
//     description:'* Rich Dad Poor Dad is a 1997 book written by Robert Kiyosaki and Sharon Lechter.  It advocates the importance of financial literacy, financial independence and building wealth through investing in assets,  real estate investing, starting and owning businesses, as well as increasing ones financial intelligence.',
//     status: '* Personal finance, entrepreneurship, business, investing, economics',
//     url:'https://m.media-amazon.com/images/I/51bX4hDuBIL.jpg' ,
//     email:'dark.lord1122@outlook.sa'
//   })

//   const book2 = new BookModel({
//     title: "-In Search of Lost Time-",
//     description:'* Swanns Way, the first part of A la recherche de temps perdu, Marcel Prousts seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work. ',
//     status: '* Personal',
//     url :'https://kbimages1-a.akamaihd.net/011c5826-8da6-49be-9602-866760464c63/1200/1200/False/in-search-of-lost-time-vol-1-7.jpg',
//     email:'dark.lord1122@outlook.sa'
//   })

//   const book3 = new BookModel({
//     title: "-One Hundred Years of Solitude-",
//     description:'* One of the 20th centurys enduring works, One Hundred Years of Solitude is a widely beloved and acclaimed novel known throughout the world, and the ultimate achievement in a Nobel Prize–winning car ',
//     status: '* investing',
//     url:'https://images-na.ssl-images-amazon.com/images/I/91mftQtgAkL.jpg',
//     email:'dark.lord1122@outlook.sa'
//   })
//   const book4 = new BookModel({
//     title: "-War and Peace-",
//     description:'* War and Peace is a literary work mixed with chapters on history and philosophy by the Russian author Leo Tolstoy, first published serially, then published in its entirety in 1869. ',
//     status: '* world literature',
//     url:'https://kbimages1-a.akamaihd.net/f10f4dd2-a5fc-4049-acb1-c52bb99809a6/1200/1200/False/war-and-peace-148.jpg',
//     email:'shamikhq@yahoo.com'
//   })

//   book1.save();
//   book2.save();
//   book3.save();
//   book4.save();

// }

// seedDataCollection();

server.get("/", testHandler);
server.get("/getBooks", getBooksHandler);
server.post("/addBook", addBookHandler);
server.delete("/deletBook/:bookId", deletBookHandler);
server.put("/updateBook/:bookId", updateBookHandler);

function testHandler(req, res) {
  res.send("test");
}

// localhost:3001/getBooks?emailName=dark.lord1122@outlook.sa

function getBooksHandler(req, res) {
  console.log("inside getCatsHandler func");
  let emailName2 = req.query.email;
  BookModel.find({ email: emailName2 }, function (err, ownerData) {
    if (err) {
      console.log("error in getting the data");
    } else {
      console.log(ownerData);
      res.send(ownerData);
    }
  });
}

// localhost:3002/addBook,{ title: "shamikh",  description: "",  status: "On Stock",  email: "dark.lord1122@outlook.sa" }
async function addBookHandler(req, res) {
  console.log(req.body);

  let { title, description, status, email } = req.body; //Destructuring assignment .
  // const newBook = new BookModel({
  //         title: title,
  //         description: description,
  //         status: status,
  //         email: email,
  // })
  // await newBook.save();
  await BookModel.create({ title, description, status, email });
  // await BookModel.create(req.body)
  getBooksHandler(req, res); // send data tso frontEnd......
}

async function deletBookHandler(req, res) {
  console.log("inside deletBookHandler func");

  let emailOwner = req.query.email;

  let bookId = req.params.bookId;
  BookModel.remove({ _id: bookId }, (error, deletedBook) => {
    if (error) {
      console.log("error in deleteing the data");
    } else {
      console.log("data deleted", deletedBook);
      BookModel.find({ email: emailOwner }, function (err, data) {
        if (err) {
          console.log("error in getting the data");
        } else {
          console.log(data);
          res.send(data);
        }
      });
    }
  });
}

async function updateBookHandler(req, res) {
  console.log("inside updateBookHandler func");
  let bookId = req.params.bookId;
  let { title, description, status, email } = req.body;
  console.log(req.body);
  BookModel.findByIdAndUpdate(
    bookId,
    { title, description, status, email },
    (error, updatedData) => {
      //updatedDatais for onejhhggj obj just
      if (error) {
        console.log("error in updating the data");
      } else {
        console.log(updatedData, "Data updated!");

        BookModel.find({ email: req.body.email }, function (err, data) {
          if (err) {
            console.log("error in getting the data");
          } else {
            console.log(data);
            res.send(data);
          }
        });
      }
    }
  );
}

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
