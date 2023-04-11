require("./config/db.config");
const env = require("dotenv").config();
const routes=require('./routes')
const { errorHandler, notFound } = require('./middlewares');
const { userTransaction } = require("./services/contract.services");


const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(cors());
app.options("*", cors());


app.use('',routes)
app.use(notFound)
app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}.`);
});

// saving the transaction details

userTransaction();
