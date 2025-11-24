require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// const moviesRoutes = require("./routes/moviesRoutes");
// app.use("/api/movies", moviesRoutes);



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

let totalUsers = 120;

app.get("/api/users/count", (req, res) => {
    res.json({total_users: totalUsers});
});

app.get("/api/movies/recent", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(6);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recent movies" });
  }
});



   
   app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   });


