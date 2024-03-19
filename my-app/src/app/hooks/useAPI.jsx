import { useState } from "react";
import apiURL from "../axios/config";
import { MdRestaurantMenu } from "react-icons/md";
const useAPI = () => {
  const authenticateUser = async (userName, userKey) => {
    try {
      const userData = await apiURL.get(`/login/${userName}/${userKey}`);
      if (userData.status === 200) {
        const logined = true;
        const nameKey = { userName, userKey, logined };
        console.log(userData.data);
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
      console.log(userData);
      console.log(userLogined);
      if (userLogined) {
        const userName = userData.userName;
        console.log(userName);
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
    const userData = JSON.parse(localStorage.getItem("userData"));
    const futureIDUser = userData.userName;
    const addScript = await apiURL.post(
      `newtask/${newTitle}/${newContent}/${futureIDUser}`
    );
    if (addScript.status === 200) {
      return true;
    } else {
      return false;
    }
  };
  return { authenticateUser, isLogined, registerUser, addTask };
};

export default useAPI;
