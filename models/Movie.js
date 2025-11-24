const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    poster: String,
    banner: String,
    rating: Number
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
