const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5055

app.use(cors())
app.use(bodyParser.json())



app.get('/', (req, res) => {
  res.send('Hello World! ')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bwabo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection err',err);
  const productCollection = client.db("Shoping").collection("products");

app.get('/events',(req,res)=>{
    productCollection.find()
    .toArray((err,items)=>{
        res.send(items)
   

    })
})






  app.post('/addElement',(req,res)=>{
    const newElement = req.body;
    console.log('add new product: ',newElement);
    productCollection.insertOne(newElement)
    .then(result => {
        console.log('inserted count',result.insertedCount);
        res.send(result.insertedCount > 0)
    })

  });
//   client.close();
// app.use((req,res,next)=>{
//     res.status(404).send('page not found');
// });
 });


app.listen(process.env.PORT || port)