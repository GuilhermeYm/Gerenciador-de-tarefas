const express = require("express");
const router = express.Router();
const jsonCONTENT = require("../content");
const fileTaskPath = require("../file");
const taskJsonContent = require("../content");
const fs = require("fs");

const doneScript = (idTask) => {
  try {
    const id = parseInt(idTask);
    const taskContent = taskJsonContent.taskJsonContent;
    const findIndex = taskContent.findIndex((task) => task.idTask === id);
    if (findIndex !== -1) {
      taskContent[findIndex].done = !taskContent[findIndex].done;
      const newJson = JSON.stringify(taskContent, null, 2);
      fs.writeFileSync(fileTaskPath.fileTaskPath, newJson);
      return true;
    }
  } catch (err) {
    console.log(new Error(err));
  }
};
router.post(`/:id_task`, (req, res) => {
  const { id_task } = req.params;
  if (doneScript(id_task)) {
    res.status(200).send("Deu tudo certo");
  } else {
    res.status(401).send(`Deu algum erro`);
  }
});
module.exports = { doneTaskRouter: router };
