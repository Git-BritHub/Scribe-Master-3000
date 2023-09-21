// Variables of packages needed to be imported
const express = require("express");
const path = require("path");
const uuid = require("./helpers/uuid");
const { readAndAppend, readFromFile, readAndDelete } = require("./helpers/fsUtils");
const app = express();

// Port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Static middleware pointing to the public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Express.js routes for default "/", "/notes" and "/index" endpoints
// app.get("/", (req, res) => res.send("Navigate to /notes or/index"));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

// API route for db.json
app.get("/api/notes", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST request to add new note with note ID
app.post("/api/notes", (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, "./db/db.json");
        res.status(200).json(newNote);

    } else {
        res.status(500).json("Error in posting note");
    }
});

app.delete("/api/notes/:id", (req, res) => {
    readAndDelete(req.params.id, "./db/db.json")
    res.json({ ok: true })
});

// listening for incoming connections on specified port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));