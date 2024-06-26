const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require('cors')
const { loginRouter } = require("./assets/userScripts/login.js");
const { registerRouter} = require('./assets/userScripts/register.js');
const { addTaskRouter } = require("./assets/taskScript/addScript.js");
const { viewScriptRouter } = require("./assets/taskScript/viewScript.js");
const { deleteTaskRouter } = require("./assets/taskScript/deleteScript.js");
const { editTaskRouter } = require("./assets/taskScript/editScript.js");
const { doneTaskRouter } = require("./assets/taskScript/doneScript.js");
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.get("/", (req, res) => {
  res.send("Api online");
});

app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))
app.use("/login", loginRouter);
app.use('/register', registerRouter)
app.use('/newtask', addTaskRouter)
app.use('/viewtask', viewScriptRouter)
app.use('/deletetask', deleteTaskRouter)
app.use('/edittask', editTaskRouter)
app.use('/donetask', doneTaskRouter)

app.listen(5173, () => {
  console.log("http://localhost:5173");
  console.log("Servidor aberto");
});
