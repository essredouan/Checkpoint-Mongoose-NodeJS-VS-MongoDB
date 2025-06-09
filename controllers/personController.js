const Person = require("../models/Person");

// Create and save a single person
const createPerson = async () => {
  try {
    const person = new Person({
      name: "Redouane",
      age: 28,
      favoriteFoods: ["Couscous", "Tajine"],
    });
    const savedPerson = await person.save();
    console.log("🟢 Person created:", savedPerson);
  } catch (err) {
    console.error("❌ Error creating person:", err.message);
  }
};

// Create many people at once
const createManyPeople = async () => {
  const arrayOfPeople = [
    { name: "Omar", age: 30, favoriteFoods: ["Pizza", "Burger"] },
    { name: "Fatima", age: 25, favoriteFoods: ["Salad"] },
    { name: "Mary", age: 20, favoriteFoods: ["Burritos"] },
  ];
  try {
    const result = await Person.insertMany(arrayOfPeople);
    console.log("🟢 People added:", result);
  } catch (err) {
    console.error("❌ Error adding many people:", err.message);
  }
};

// Find people by name
const findPeopleByName = async (personName) => {
  try {
    const people = await Person.find({ name: personName });
    return people;
  } catch (err) {
    console.error("❌ Error finding people:", err.message);
  }
};

// Find one person by favorite food
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    return person;
  } catch (err) {
    console.error("❌ Error finding person by food:", err.message);
  }
};

// Find a person by _id
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    return person;
  } catch (err) {
    console.error("❌ Error finding person by ID:", err.message);
  }
};

// Find, edit then save (add "hamburger" to favoriteFoods)
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    if (!person) {
      console.log("Person not found");
      return;
    }
    person.favoriteFoods.push("hamburger");
    const updatedPerson = await person.save();
    return updatedPerson;
  } catch (err) {
    console.error("❌ Error updating person:", err.message);
  }
};

// Find one and update age to 20 by name
const findAndUpdate = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true } // Return the updated document
    );
    return updatedPerson;
  } catch (err) {
    console.error("❌ Error updating person:", err.message);
  }
};

// Remove one person by _id
const removeById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    return removedPerson;
  } catch (err) {
    console.error("❌ Error removing person:", err.message);
  }
};

// Remove all people named Mary
const removeManyPeople = async () => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    return result;
  } catch (err) {
    console.error("❌ Error removing many people:", err.message);
  }
};

// Chain query helpers: find people who like burritos, sort by name, limit 2, hide age
const queryChain = async () => {
  try {
    const people = await Person.find({ favoriteFoods: "Burritos" })
      .sort({ name: 1 })
      .limit(2)
      .select("-age")
      .exec();
    return people;
  } catch (err) {
    console.error("❌ Error with query chain:", err.message);
  }
};

module.exports = {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};
