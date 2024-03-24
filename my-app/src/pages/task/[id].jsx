import HeaderComponents from "@/app/components/HeaderComponents";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/router";
const taskView = () => {
  const { query } = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [taskContent, setTaskConteont] = useState("");
  const taskID = query?.id;
  useEffect(() => {
    const verificateDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (verificateDarkMode) {
      setDarkMode(!darkMode);
      document.body.classList.toggle("bg-black", verificateDarkMode);
    }
    try {
      const setContent = () => {
        
      };
    } catch (err) {
      console.log(new Error(err));
    }
  }, []);
  return (
    <>
      <header>
        <HeaderComponents />
      </header>{" "}
      <main>
        <div className="flex flex-col justify-center items-center">
          <h2>Tarefa</h2>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default taskView;
