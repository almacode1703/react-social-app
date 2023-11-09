const express = require('express');
const app  = express();
const config = require('dotenv').config();
const port = process.env.PORT || 8001;
const mongo_uri = process.env.MONGO_URI;
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const cors = require('cors')
const bodyParser = require('body-parser')

const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}


app.use(cors(corsOption));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended : false,limit: '50mb'}))


// Establishing connection with MongoDB

const connectToMongo = async()=>{
    try{
        await mongoose.connect(mongo_uri).then(()=>{
            console.log("Connected to DB successfully")
            app.listen(port, ()=>{
                console.log(`Server is lisening to PORT : ${port}`)
            })
        })
    }
    catch(error){
        console.log("Error connecting to DB....")
    }
}


connectToMongo()


// Create Products API 

app.post("/api/v1/products", async(req, res)=> {
    const {base64}  = req.body
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})

app.get('/api/v1/products', async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/api/v1/products/:id', async(req, res)=>{
    try {
        const{id} = req.params;
        const product = await Product.findById(id);
        res.status(500).json(product)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})
