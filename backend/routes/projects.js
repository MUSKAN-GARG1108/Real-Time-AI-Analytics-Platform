const express = require("express");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

let projects = [];

router.post("/projects", authMiddleware, (req, res) => {

  const { name } = req.body;

  const project = {
    id: Date.now(),
    userId: req.userId,
    name
  };

  projects.push(project);

  res.json(project);

});

router.get("/projects", authMiddleware, (req, res) => {

  const userProjects = projects.filter(p => p.userId === req.userId);

  res.json(userProjects);

});

module.exports = router;