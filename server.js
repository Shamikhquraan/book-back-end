"use strict";

require("dotenv").config();
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const axios = require("axios");
server.use(express.json());

// const mongoVar= process.env.MONGO_LINK ;
mongoose.connect(`${process.env.DB_LINK}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const BookSchema = require("./model/BookSchema.js");


const BookModel = mongoose.model("books",BookSchema);

server.get("/", testHandler);
server.get("/getBooks", getBooksHandler);
server.post("/addBook", addBookHandler);
server.delete('/deletBook/:bookId', deletBookHandler);
server.put('/updateBook/:bookId', updateBookHandler);


function testHandler(req, res) {
  res.send("test");
};

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




async function updateBookHandler(req,res) { 
  console.log('inside updateBookHandler func');
  let bookId = req.params.bookId;
  let { title, description, status,email }=req.body;
  console.log(req.body);
  BookModel.findByIdAndUpdate(bookId, { title , description, status, email },(error,updatedData)=>{//updatedDatais for onejhhggj obj just 
      if(error) {
          console.log('error in updating the data')
      } else {
          console.log(updatedData,"Data updated!");
          
          BookModel.find({email: req.body.email},function(err,data){
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
