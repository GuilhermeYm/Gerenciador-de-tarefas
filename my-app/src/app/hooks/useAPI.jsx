import { useState } from "react";
import apiURL from "../axios/config";
import { MdRestaurantMenu } from "react-icons/md";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
const useAPI = () => {
  const authenticateUser = async (userName, userKey) => {
    try {
      const userData = await apiURL.get(`/login/${userName}/${userKey}`);
      if (userData.status === 200) {
        const logined = true;
        const nameKey = { userName, userKey, logined };
        localStorage.setItem("userData", JSON.stringify(nameKey));
        return nameKey;
      } else {
        return false;
      }
    } catch (err) {
      console.log(userName, userKey);
      console.log("Erro na hora de autenticar o usuário");
    }
  };
  const isLogined = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const userLogined = userData.logined;
      if (userLogined) {
        const userName = userData.userName;
        return userName;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const registerUser = async (newName, newKey, newEmail) => {
    try {
      const newUser = await apiURL.post(
        `register/${newName}/${newKey}/${newEmail}`
      );
      let logined = false;
      if (newUser.status === 200) {
        const nameKey = {
          newName,
          newKey,
          logined,
        };
        localStorage.setItem("userData", JSON.stringify(nameKey));
        return nameKey;
      } else {
        return false;
      }
    } catch (err) {
      console.log(
        new Error(`Aconteceu alguma coisa na hora de registrar o user: ${err}`)
      );
    }
  };
  const addTask = async (newTitle, newContent) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const futureIDUser = userData.userName;
      const addTask = await apiURL.post(
        `/newtask/${newTitle}/${newContent}/${futureIDUser}`
      );
      if (addTask.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(
        new Error(`Erro na hora de adicionar uma nova tarefa ${err}`)
      );
    }
  };
  const viewTask = async () => {
    try {
      if (typeof window !== "undefined") {
        const localStorageVar = localStorage.getItem("userData");
        const userData = JSON.parse(localStorageVar);
        const futureIDUser = userData.userName;
        const viewTask = await apiURL.get(`/viewtask/${futureIDUser}`);
        return viewTask;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTask = async (idTask) => {
    try {
      const deleteTask = await apiURL.post(`/deletetask/${idTask}`)
      if (deleteTask) {
        return true
      } else {
        return false
      }
    } catch(err) {
      console.log(err)
    }
  };
  return { authenticateUser, isLogined, registerUser, addTask, viewTask, deleteTask};
};

export default useAPI;
