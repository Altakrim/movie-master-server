require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;




  // Movie Model 
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  banner: String,
  rating: { type: Number, min: 0, max: 10 },
  genre: String,
  releaseYear: Number,
  director: String,
  cast: String,
  duration: Number,
  plotSummary: String,
  language: String,
  country: String,
  addedBy: String
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);



// Connect to MongoDB
const uri = process.env.MONGO_URL;

if (!uri) {
    console.error("MongoDB URI not found in .env file");
    process.exit(1);
}
mongoose.connect(uri)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('Error connection to MongoDB:', err));

// Middlewares 
app.use(cors());
app.use(express.json());

//  Root
app.get('/', (req, res) => {
    res.send('MovieMaser server is running and api working')
});

// Total Users
let totalUsers = 120;

app.get("/api/users/count", (req, res) => {
    res.json({total_users: totalUsers});
});

// Recently Added Movies (latest 6)
app.get("/api/movies/recent", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(6);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recent movies" });
  }
    
   
});

// All Movies 
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies" });
  }
});

//  Add New Movie 
 app.post("/movies/add", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.json({ message: "Movie added", movie });
  } catch (err) {
    res.status(400).json({ message: "Error adding movie", error: err.message });
  }
});


//   const moviesData = [
//     [
//   {
//     "title": "Inception",
//     "genre": "Sci-Fi",
//     "releaseYear": 2010,
//     "director": "Christopher Nolan",
//     "cast": "Leonardo DiCaprio, Joseph Gordon-Levitt",
//     "rating": 8.8,
//     "duration": 148,
//     "plotSummary": "A thief who steals corporate secrets through dream-sharing technology...",
//     "posterUrl": "https://i.ibb.co/3cFj7YF/inception.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "Interstellar",
//     "genre": "Sci-Fi",
//     "releaseYear": 2014,
//     "director": "Christopher Nolan",
//     "cast": "Matthew McConaughey, Anne Hathaway",
//     "rating": 8.6,
//     "duration": 169,
//     "plotSummary": "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
//     "posterUrl": "https://i.ibb.co/5h3cN0s/interstellar.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "The Dark Knight",
//     "genre": "Action",
//     "releaseYear": 2008,
//     "director": "Christopher Nolan",
//     "cast": "Christian Bale, Heath Ledger",
//     "rating": 9.0,
//     "duration": 152,
//     "plotSummary": "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into chaos.",
//     "posterUrl": "https://i.ibb.co/1LxH3n9/dark-knight.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "Avatar",
//     "genre": "Adventure",
//     "releaseYear": 2009,
//     "director": "James Cameron",
//     "cast": "Sam Worthington, Zoe Saldana",
//     "rating": 7.9,
//     "duration": 162,
//     "plotSummary": "A paraplegic Marine is sent to the moon Pandora on a unique mission.",
//     "posterUrl": "https://i.ibb.co/kXqLzHt/avatar.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "Dune",
//     "genre": "Sci-Fi",
//     "releaseYear": 2021,
//     "director": "Denis Villeneuve",
//     "cast": "Timothée Chalamet, Zendaya",
//     "rating": 8.3,
//     "duration": 155,
//     "plotSummary": "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family.",
//     "posterUrl": "https://i.ibb.co/DzQH1jQ/dune.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "The Matrix",
//     "genre": "Sci-Fi",
//     "releaseYear": 1999,
//     "director": "The Wachowskis",
//     "cast": "Keanu Reeves, Laurence Fishburne",
//     "rating": 8.7,
//     "duration": 136,
//     "plotSummary": "A hacker discovers the world is a simulation and joins the rebellion against the machines.",
//     "posterUrl": "https://i.ibb.co/QkN5LtF/matrix.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "Gladiator",
//     "genre": "Action",
//     "releaseYear": 2000,
//     "director": "Ridley Scott",
//     "cast": "Russell Crowe, Joaquin Phoenix",
//     "rating": 8.5,
//     "duration": 155,
//     "plotSummary": "A former Roman General sets out to exact vengeance against the corrupt emperor.",
//     "posterUrl": "https://i.ibb.co/ZW8qD1B/gladiator.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "Titanic",
//     "genre": "Romance",
//     "releaseYear": 1997,
//     "director": "James Cameron",
//     "cast": "Leonardo DiCaprio, Kate Winslet",
//     "rating": 7.8,
//     "duration": 195,
//     "plotSummary": "A love story unfolds aboard the ill-fated RMS Titanic.",
//     "posterUrl": "https://i.ibb.co/4tGhFjq/titanic.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "The Godfather",
//     "genre": "Crime",
//     "releaseYear": 1972,
//     "director": "Francis Ford Coppola",
//     "cast": "Marlon Brando, Al Pacino",
//     "rating": 9.2,
//     "duration": 175,
//     "plotSummary": "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
//     "posterUrl": "https://i.ibb.co/5R1F9KZ/godfather.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "Pulp Fiction",
//     "genre": "Crime",
//     "releaseYear": 1994,
//     "director": "Quentin Tarantino",
//     "cast": "John Travolta, Uma Thurman",
//     "rating": 8.9,
//     "duration": 154,
//     "plotSummary": "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine.",
//     "posterUrl": "https://i.ibb.co/7kZzXnX/pulp-fiction.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "Forrest Gump",
//     "genre": "Drama",
//     "releaseYear": 1994,
//     "director": "Robert Zemeckis",
//     "cast": "Tom Hanks, Robin Wright",
//     "rating": 8.8,
//     "duration": 142,
//     "plotSummary": "Life story of a man with a low IQ who witnesses historical events.",
//     "posterUrl": "https://i.ibb.co/0XvRcsD/forrest-gump.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "The Shawshank Redemption",
//     "genre": "Drama",
//     "releaseYear": 1994,
//     "director": "Frank Darabont",
//     "cast": "Tim Robbins, Morgan Freeman",
//     "rating": 9.3,
//     "duration": 142,
//     "plotSummary": "Two imprisoned men bond over a number of years, finding solace and eventual redemption.",
//     "posterUrl": "https://i.ibb.co/HpC68jQ/shawshank.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "Avengers: Endgame",
//     "genre": "Action",
//     "releaseYear": 2019,
//     "director": "Anthony Russo, Joe Russo",
//     "cast": "Robert Downey Jr., Chris Evans",
//     "rating": 8.4,
//     "duration": 181,
//     "plotSummary": "After the devastating events of Avengers: Infinity War, the remaining Avengers assemble for one final battle.",
//     "posterUrl": "https://i.ibb.co/7yVjQzV/endgame.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "Jurassic Park",
//     "genre": "Adventure",
//     "releaseYear": 1993,
//     "director": "Steven Spielberg",
//     "cast": "Sam Neill, Laura Dern",
//     "rating": 8.1,
//     "duration": 127,
//     "plotSummary": "During a preview tour, a theme park suffers a major power breakdown, putting the lives of its visitors at risk.",
//     "posterUrl": "https://i.ibb.co/3S1G0pL/jurassic-park.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   },
//   {
//     "title": "The Lion King",
//     "genre": "Animation",
//     "releaseYear": 1994,
//     "director": "Roger Allers, Rob Minkoff",
//     "cast": "Matthew Broderick, Jeremy Irons",
//     "rating": 8.5,
//     "duration": 88,
//     "plotSummary": "Lion prince Simba struggles to accept his destiny as king.",
//     "posterUrl": "https://i.ibb.co/vXpqM7s/lion-king.jpg",
//     "language": "English",
//     "country": "USA",
//     "addedBy": "user@example.com"
//   }
// ]

//   ];

//   try {
//     await Movie.insertMany(moviesData);
//     res.json({ message: "15 movies added" });
//   } catch (err) {
//     res.status(500).json({ message: "Error adding movies", error: err.message });
//   }
// });


//  Get Single Movie 
app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie" });
  }
});

//  Update Movie 
app.put("/movies/update/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie updated", movie });
  } catch (err) {
    res.status(400).json({ message: "Error updating movie", error: err.message });
  }
});

//  Delete Movie 
app.delete("/movies/:id", async (req, res) => {
  
   const id = req.params.id;
  const movie = await Movie.findById(id);
  res.send(movie);
});

// Reset Movies - temporary route
app.delete("/movies/reset", async (req, res) => {
  try {
    await Movie.deleteMany({});
    res.json({ message: "All movies deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting movies" });
  }
});


   
   app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
   });


