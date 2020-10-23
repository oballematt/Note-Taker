const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;
const directory = path.join(__dirname, "/public");


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());