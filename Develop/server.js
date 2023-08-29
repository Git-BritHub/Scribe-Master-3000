// Variables of packages needed to be imported
const express = require("express");
const path = require("path");
const app = express();
const noteData = require("./db/db.json")
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

// listening for incoming connections on specified port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));