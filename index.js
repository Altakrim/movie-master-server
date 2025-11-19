require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');



// Connect to MongoDB
const uri = process.env.MONGO_URL;

if (!uri) {
    console.error("MongoDB URI not found in .env file");
    process.exit(1);
}
mongoose.connect(uri)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('Error connection to MongoDB:', err));


app.use(cors());
app.use(express.json());

//  root
app.get('/', (req, res) => {
    res.send('MovieMaser server is running and api working')
});

   
   app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   });


