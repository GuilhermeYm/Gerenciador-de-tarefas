const express = require("express");
const router = express.Router();
const jsonCONTENT = require("../content");
const fileTaskPath = require("../file");
const taskJsonContent = require("../content");
const { generateIdTask } = require("../generateID");
const fs = require("fs");
const viewTask = (nameUser) => {
  try {
    const userJsonContent = jsonCONTENT.jsonCONTENT;
    const findUser = userJsonContent.find((users) => users.name === nameUser);
    const id = findUser ? findUser.id : null;
    const taskContent = taskJsonContent.taskJsonContent;
    const taskFound = taskContent.filter((tasks) => tasks.idAuthor === id);
    generateIdTask();
    return taskFound;
  } catch (err) {
    console.log(
      new Error(`Aconteceu alguma coisa na hora de ver uma task: ${err}`)
    );
  }
};

router.get("/:user_name", (req, res) => {
  const { user_name } = req.params;
  try {
    const tasks = viewTask(user_name);
    res.status(200).json({ user: tasks });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
module.exports = { viewScriptRouter: router };
