const express = require("express");
const router = express.Router();
const jsonCONTENT = require("../content");
const fileTaskPath = require("../file");
const taskJsonContent = require("../content");
const fs = require("fs");
const addTask = (newTitle, newContent, nameUser) => {
  try {
    const userJsonContent = jsonCONTENT.jsonCONTENT;
    const findUser = userJsonContent.find((users) => users.name === nameUser);
    const id = findUser ? findUser.id : null;
    const objectExample = {
    idAuthor: id,
      title: newTitle,
      content: newContent,
      done: false,
    };
    const taskContent = taskJsonContent.taskJsonContent;
    taskContent.push(objectExample);
    const newJson = JSON.stringify(taskContent, null, 2);
    fs.writeFileSync(fileTaskPath.fileTaskPath, newJson);
    console.log(taskContent);
  } catch (err) {
    console.log(
      new Error(
        `Aconteceu alguma coisa na hora de adicionar uma nova task: ${err}`
      )
    );
  }
};
router.post("/:title/:content/:name_user", (req, res) => {
  const { title, content, name_user } = req.params;
  if (addTask(title, content, name_user)) {
    res.status(200).send("Task adicionada");
  } else {
    res.status(401).send("Deu algum erro na hora de adicionar a task");
  }
});

module.exports = { addTaskRouter: router };
