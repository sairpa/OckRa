const mongoose = require("mongoose");
const express = require("express");
const app = express();
/*const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");*/

const authRoutes = require("./routes/auth");
const userRoutes=require("./routes/user");
mongoose
  .connect("mongodb://localhost:27017/Model_Logesh", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const port = 5000;
//Middlewares
app.use(express.json());
/*app.use(cookieParser());
app.use(cors());*/

//My Routes
app.use("/", authRoutes);
app.use("/",userRoutes);
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
