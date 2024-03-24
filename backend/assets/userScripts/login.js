const express = require("express");
const router = express.Router();
const jsonCONTENT = require("../content.js");
const { generateID } = require("../generateID");

const loginFunction = (nameParams, keyParams) => {
  const json = jsonCONTENT.jsonCONTENT;
  console.log(json);
  const user = json.find(
    (user) => user.name === nameParams && user.key === keyParams
  );
  if (user) {
    console.log(user);
    generateID();
    return true;
  } else {
    return false;
  }
};

router.get("/:name_user/:key_user", (req, res) => {
  const { name_user, key_user } = req.params;
  console.log(name_user, key_user);
  const id = jsonCONTENT.jsonCONTENT;
  console.log(id);
  if (loginFunction(name_user, key_user)) {
    res.status(200).json({ message: "Login bem-sucessido" });
  } else {
    res.status(401).send("Senha ou nome estão erradods");
  }
});

module.exports = { loginRouter: router };
