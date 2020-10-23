const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;
const directory = path.join(__dirname, "/public");


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

fs.readFile("db/db.json","utf8", (err, data) => {
    if (err) throw err
    const info = JSON.parse(data)

    app.get("/api/notes", function(req, res){
        res.sendFile(path.join(__dirname, "/db/db.json"))
    })

    app.get("/api/notes/:id", function(req, res){
        res.json(info[req.params.id])
    })

    app.get("/notes", function(req, res){
        res.sendFile(path.join(directory, "notes.html"))
    })

    app.get("*", function(req, res){
        res.sendFile(path.join(directory, "index.html"))
    })







})
