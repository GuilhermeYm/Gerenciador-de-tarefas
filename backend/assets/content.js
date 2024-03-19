const fileUserPath = require("./file");
const fs = require("fs");
const fileTaskPath = require("./file");

const content = () => {
  try {
    const filePath = fileUserPath.fileUserPath;
    let contentJSON = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(contentJSON);
    return json;
  } catch (err) {
    console.log(`Deu algum erro na hora de ler o arquivo json: ${err}`);
    return null;
  }
};

const taskContent = () => {
  try {
    const filePath = fileTaskPath.fileTaskPath; 
    let taskContent = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(taskContent);
    return json;
  } catch (err) {
    console.error(`Erro ao ler o arquivo JSON: ${err}`);
    return null;
  }
};

module.exports = { jsonCONTENT: content(), taskJsonContent: taskContent() };
