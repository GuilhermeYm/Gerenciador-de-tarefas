const express = require("express");
const router = express.Router();
const jsonCONTENT = require("../content");
const fileTaskPath = require("../file");
const taskJsonContent = require("../content");
const fs = require("fs");
const editTask = (newTitle, newContent, idTaskParams) => {
  try {
    console.log(typeof idTaskParams)
    const idTask = parseInt(idTaskParams);
    console.log(idTask, newTitle, newContent)
    const taskContent = taskJsonContent.taskJsonContent;
    const findIndex = taskContent.findIndex((task) => task.idTask === idTask);
    if (findIndex !== -1) {
      taskContent[findIndex].title = newTitle;
      taskContent[findIndex].content = newContent;

      const newJson = JSON.stringify(taskContent, null, 2);
      console.log(`Deu tudo certo!`)
      fs.writeFileSync(fileTaskPath.fileTaskPath, newJson);
      return true;
    } else {
      throw new Error(`FindIndex retornou false`);
    }
  } catch (err) {
    console.log(new Error(`Erro na hora de editar: ${err}`));
  }
};
router.post("/:new_title/:new_content/:id_task", (req, res) => {
  const { new_title, new_content, id_task } = req.params;
  if (editTask(new_title, new_content, id_task)) {
    res.status(200).send(`Task editada`);
  } else {
    res.status(401).send(`Erro na hora de editar`);
  }
});
module.exports = { editTaskRouter: router };
