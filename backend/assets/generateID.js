const jsonCONTENT = require("./content.js");
const taskJsonContent = require("./content.js");
const fileUserPath = require("./file.js");
const fileTaskPath = require("./file.js");
const fs = require("fs");

const generateID = () => {
  const json = jsonCONTENT.jsonCONTENT;
  json.forEach((user, index) => {
    if (!user.id) {
      user.id = index + 1;
    }
  });
  const newContentJson = JSON.stringify(json, null, 2);
  const filePath = fileUserPath.fileUserPath;
  fs.writeFileSync(filePath, newContentJson);
};

const generateIdTask = () => {
  const json = taskJsonContent.taskJsonContent;
  console.log(json);
  json.forEach((task, index) => {
    if (!task.idTask) {
      task.idTask = index + 1;
    }
  });
  const newTaskContent = JSON.stringify(json, null, 2);
  const filePath = fileTaskPath.fileTaskPath;
  fs.writeFileSync(filePath, newTaskContent);
};
module.exports = {generateID, generateIdTask};
