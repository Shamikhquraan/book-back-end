"use strict";

require("dotenv").config();
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const axios = require("axios");
server.use(express.json());

mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BookSchema = require("./model/BookSchema.js");


const BookModel = mongoose.model("books",BookSchema);

server.get("/test", testHandler);
server.get("/getBooks", getBooksHandler);
server.post("/addBook", addBookHandler);
server.delete('/deletBook/:bookId', deletBookHandler);

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
  getBooksHandler(req, res); // send data to frontEnd
}



async function deletBookHandler(req,res) {
  console.log('inside deletBookHandler func');

  let emailOwner= req.query.email;

  let bookId = req.params.bookId;
  BookModel.remove({_id:bookId},(error,deletedBook)=>{
      if(error) {
          console.log('error in deleteing the data')
      } else {
          console.log('data deleted', deletedBook)
          BookModel.find({email: emailOwner},function(err,data){
              if(err) {
                  console.log('error in getting the data')
              } else {
                  console.log(data);
                  res.send(data);
              }
          })
      }
  })

}


server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
