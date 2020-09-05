const express = require("express");

const server = express();

server.use(express.json());

const port = 8000;

const shortid = require("shortid");

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// server.get(`/`, (req, res) => {
//   res.json({ message: "Hello, World" });
// });

let users = [
  {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
  {
    id: shortid.generate(),
    name: "Jack Doe",
    bio: "Not Tarzan's Wife, another Jack",
  },
];

server.get(`/api/users`, (req, res) => {
  res.status(200).json(users);
});

server.get(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  const found = users.find((user) => user.id === id);

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name && newUser.bio) {
    newUser.id = shortid.generate();
    users.push(newUser);
    res.status(201).json(newUser);
  } else if (!newUser.name || !newUser.bio) {
    res.status(400).json({ error: "Please provide name and bio for the user" });
  }
});

server.delete(`/api/users/:id`, (req, res) => {
  const id = req.params.id;

  const found = users.find((user) => user.id === id);

  if (found) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(users);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

server.put(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  const found = users.find((user) => user.id === id);

  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});
