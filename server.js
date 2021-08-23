"use strict";

require("dotenv").config();
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const axios = require("axios");

const BookSchema = require('./model');
const BookModel = require('./model');


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



server.get("/test", testHandler);
server.get('/getBooks', getBooksHandler);



function testHandler(req, res) {
  res.send("test");
}


// localhost:3001/getBooks?emailName=dark.lord1122@outlook.sa
function getBooksHandler(req,res) {
    console.log('inside getCatsHandler func')
    let emailName2 = req.query.email;
    BookModel.find({email:emailName2},function(err,ownerData){
        if(err) {
            console.log('error in getting the data')
        } else {
            console.log(ownerData);
            res.send(ownerData)
        }
    })
}



server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
