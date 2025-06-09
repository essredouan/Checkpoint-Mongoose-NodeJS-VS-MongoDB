const express = require("express");
//W14gE3XHznREFnUN
const router = express.Router();
const {
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
} = require("../controllers/personController");

// Test route to create a person
router.get("/createPerson", async (req, res) => {
  await createPerson();
  res.send("Person created");
});

// Test route to create many people
router.get("/createManyPeople", async (req, res) => {
  await createManyPeople();
  res.send("Many people created");
});

// Find people by name (pass ?name=Omar)
router.get("/findByName", async (req, res) => {
  const { name } = req.query;
  const people = await findPeopleByName(name);
  res.json(people);
});

// Find one person by favorite food (pass ?food=Pizza)
router.get("/findOneByFood", async (req, res) => {
  const { food } = req.query;
  const person = await findOneByFood(food);
  res.json(person);
});

// Find person by ID (pass /:id)
router.get("/findById/:id", async (req, res) => {
  const person = await findPersonById(req.params.id);
  if (!person) return res.status(404).send("Person not found");
  res.json(person);
});

// Add "hamburger" to favoriteFoods by ID (pass /edit/:id)
router.put("/edit/:id", async (req, res) => {
  const updatedPerson = await findEditThenSave(req.params.id);
  if (!updatedPerson) return res.status(404).send("Person not found");
  res.json(updatedPerson);
});

// Update person's age by name (pass /update?name=Omar)
router.put("/update", async (req, res) => {
  const { name } = req.query;
  const updatedPerson = await findAndUpdate(name);
  if (!updatedPerson) return res.status(404).send("Person not found");
  res.json(updatedPerson);
});

// Delete person by ID (pass /delete/:id)
router.delete("/delete/:id", async (req, res) => {
  const removedPerson = await removeById(req.params.id);
  if (!removedPerson) return res.status(404).send("Person not found");
  res.json(removedPerson);
});

// Delete all people named Mary
router.delete("/deleteManyMary", async (req, res) => {
  const result = await removeManyPeople();
  res.json(result);
});

// Query chain example
router.get("/queryChain", async (req, res) => {
  const people = await queryChain();
  res.json(people);
});

module.exports = router;
