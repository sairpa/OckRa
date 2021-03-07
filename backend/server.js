const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sairpa:sairam13@cluster0.2jhcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))

const userroute = require('./routes/user');
const ockraroute = require('./routes/ockra');

app.use('/users',userroute);
app.use('/ockra',ockraroute);

app.listen(port, () =>{
console.log(`Server is running in: ${port} `);
});
