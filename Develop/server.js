// Variables of packages needed to be imported
const express = require("express");
const path = require("path");
const uuid = require("./helpers/uuid");
const noteData = require("./db/db.json");
const app = express();
// const fs = require("fs");

// Port the Express.js server will run
const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static("public"));

// Express.js routes for default "/", "/notes" and "/index" endpoints
app.get("/", (req, res) => res.send("Navigate to /notes or/index"));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/index", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

// API route for db.json
app.get("/api/notes", (req, res) => res.json(noteData));

// POST request to add new note with note ID
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            noteID: uuid(),
        };

        const response = {
            status: "success",
            body: newNote,
        };
        
        console.log(response);
        res.status().json(response);

    } else {
        res.status().json("Error in posting note");
    }
})

// listening for incoming connections on specified port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));