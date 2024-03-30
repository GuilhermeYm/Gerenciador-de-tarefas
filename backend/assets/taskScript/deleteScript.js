const express = require("express");
const router = express.Router();
const jsonCONTENT = require("../content");
const fileTaskPath = require("../file");
const taskJsonContent = require("../content");
const fs = require("fs");
const deleteTask = (idTaskParams) => {
  try {
    const idTask = parseInt(idTaskParams);
    const taskContent = taskJsonContent.taskJsonContent;
    const findTask = taskContent.findIndex((task) => task.idTask === idTask);
    if (findTask !== -1) {
      taskContent.splice(findTask, 1);
      const newJson = JSON.stringify(taskContent, null, 2);
      fs.writeFileSync(fileTaskPath.fileTaskPath, newJson);
      return true;
    }
    return false
  } catch (err) {
    console.log(new Error(`Deu algum erro na hora de deletar a task ${err}`));
  }
};

router.post("/:id_task", (req, res) => {
  const { id_task } = req.params;
  if (deleteTask(id_task)) {
    res.status(200).send("Task editada");
  } else {
    res.status(401).send("Deu algum erro");
  }
});

module.exports = { deleteTaskRouter: router };
