const express = require("express");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const router = express.Router();
const DATA_FILE = "./data.json";

// Utility functions
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE));
const writeData = (data) =>
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// GET all
router.get("/", (req, res) => {
  res.json(readData());
});

// POST new
router.post("/", (req, res) => {
  const data = readData();
  const newItem = { id: uuid(), ...req.body };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

// PUT update
router.put("/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex((i) => i.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: "Not found" });

  data[index] = { ...data[index], ...req.body };
  writeData(data);
  res.json(data[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const data = readData().filter((i) => i.id !== req.params.id);
  writeData(data);
  res.status(204).end();
});

module.exports = router;
