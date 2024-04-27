/*
Author: Sam Gumm
ISU Netid : smgumm@iastate.edu
Date :  04/16
*/
var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
app.listen(port, () => {
console.log("App listening at http://%s:%s", host, port);
});

const { MongoClient } = require("mongodb");

// MongoDB
const url = "mongodb+srv://smgumm:59755183Gutt!%40@secoms319.tcdgemj.mongodb.net/"
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/listAllProducts", async (req, res) => {
    try {
        console.log("Fetching all products from MongoDB");
        const query = {}; // An empty query object fetches all documents
        const results = await db.collection("catalog")
            .find(query)
            .toArray(); // Convert to array to send back to the client
        console.log("Products retrieved:", results.length);
        res.status(200).json(results); // Send results as JSON
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(500).send("Server error");
    }
});


//CRUD goes here