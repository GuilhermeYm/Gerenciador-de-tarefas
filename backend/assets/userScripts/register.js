const express = require("express");
const router = express.Router();
const fileUserPath = require("../file.js");
const fs = require("fs");
const jsonCONTENT = require("../content.js");
const { generateID } = require("../generateID.js");
const registerFunction = (newName, newKey, newEmail) => {
  try {
    const objectExample = {
      name: newName,
      key: newKey,
      email: newEmail,
    };
    const json = jsonCONTENT.jsonCONTENT;
    json.push(objectExample);
    const newContentJson = JSON.stringify(json, null, 2);
    const fileJson = fileUserPath.fileUserPath;
    console.log(fileJson)
    generateID();
    fs.writeFileSync(fileJson, newContentJson);
    return true
  } catch (err) {
    console.error(`Deu algum erro na hora de registrar o usuário ${err}`);
    return false;
  }
};
router.post("/:new_name/:new_key/:new_email", (req, res) => {
  const { new_name, new_key, new_email } = req.params;
  console.log(new_name, new_key, new_email);
  if (registerFunction(new_name, new_key, new_email)) {
    res.status(200).send("Login bem-sucessido");
  } else {
    res.status(401).send("Deu algum erro");
  }
});

module.exports = { registerRouter: router };
