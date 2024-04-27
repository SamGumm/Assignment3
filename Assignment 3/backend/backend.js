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

//CRUD
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

app.get("/:id", async (req, res) => {
    try{
    const productid = Number(req.params.id);
    console.log("Product to find :", productid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": productid };
    const results = await db.collection("catalog")
    .findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
    }
    catch(error){
        console.error("Error fetching product", error);
        res.status(500).send("Server error");
    }
    });

app.post("/addProduct", async (req, res) => {

    try{
        await client.connect();
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        const newDocument = {
            "id": req.body.id,
            "title": req.body.name,
            "price": req.body.price,
            "description": req.body.description,
            "category": req.body.category,
            "image": req.body.image,
            "rating": req.body.rating
            };
            console.log(newDocument);
        const results = await db
        .collection("catalog")
        .insertOne(newDocument);
        res.status(200);
        res.send(results);
    }
    catch(error){
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    }
 });

 app.delete("/deleteProduct/:id", async (req, res) => {
    try {
    const id = Number(req.params.id);
    await client.connect();
    console.log("Product to delete :",id);
    const query = { id: id };
    // delete
    const results = await db.collection("catalog").deleteOne(query);
    res.status(200);
    res.send(results);
    }
    catch (error){
    console.error("Error deleting product:", error);
    res.status(500).send({ message: 'Internal Server Error' });
    }
    });

    app.put("/updateProduct/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            const query = { id: id };
    
            // Data for updating the document, typically comes from the request body
            const updateData = {
                $set: {
                    "id": req.body.id,
                    "title": req.body.name,
                    "price": req.body.price,
                    "description": req.body.description,
                    "category": req.body.category,
                    "image": req.body.image,
                    "rating": req.body.rating
                }
            };
    
            await client.connect();
            console.log("Product to Update :", id);
            console.log(req.body);
    
            const results = await db.collection("catalog").updateOne(query, updateData);
    
            if (results.matchedCount === 0) {
                return res.status(404).send({ message: 'Robot not found' });
            }
    
            res.status(200).send(results);
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
        });
    


