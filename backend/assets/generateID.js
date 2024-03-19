const jsonCONTENT = require("./content.js");
const fileUserPath = require("./file.js");
const fs = require("fs");
const generateID = () => {
  const json = jsonCONTENT.jsonCONTENT;
  json.forEach((user, index) => {
    if (!user.id) {
      user.id = index + 1;
    }
  });
  const newContentJson = JSON.stringify(json, null, 2);
  const filePath = fileUserPath.fileUserPath
  fs.writeFileSync(filePath, newContentJson);
};

module.exports = { generateID: generateID };
