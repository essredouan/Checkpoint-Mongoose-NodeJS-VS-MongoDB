const mongoose = require("mongoose");

// Define Person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

module.exports = mongoose.model("Person", personSchema);
