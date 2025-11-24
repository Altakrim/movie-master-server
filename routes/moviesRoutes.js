const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// GET — Latest 6 Movies
router.get("/recent", async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 }).limit(6);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recent movies" });
    }
});

module.exports = router;