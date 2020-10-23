const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const directory = path.join(__dirname, "/public");


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err
    const info = JSON.parse(data)

    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "/db/db.json"))
    })

    app.get("/api/notes/:id", function (req, res) {
        res.json(info[req.params.id])
    })

    app.get("/notes", function (req, res) {
        res.sendFile(path.join(directory, "notes.html"))
    })

    app.get("*", function (req, res) {
        res.sendFile(path.join(directory, "index.html"))
    })

    app.post("/api/notes", function (req, res) {
        let newNote = req.body
        let id = (info.length).toString()
        newNote.id = id
        info.push(newNote)
        fs.writeFileSync("db/db.json", JSON.stringify(info))
        res.json(info)
    })

    app.delete("/api/notes/:id", function (req, res) {
        info.splice(req.params.id, 1)
        fs.writeFileSync("db/db.json", JSON.stringify(info))
        res.json(info)
    })
})

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});  
