import HeaderComponents from "@/app/components/HeaderComponents";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/router";
import useAPI from "@/app/hooks/useAPI";
const taskView = () => {
  const { query } = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [taskContent, setTaskContent] = useState("");
  const { viewTask } = useAPI();
  const taskID = query?.id;
  useEffect(() => {
    const verificateDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (verificateDarkMode) {
      setDarkMode(!darkMode);
      document.body.classList.toggle("bg-black", verificateDarkMode);
    }
    const setContent = async () => {
      try {
        const viewTaskVerificate = await viewTask();
        if (viewTaskVerificate.data && viewTaskVerificate.data.user) {
          const arrayTask = viewTaskVerificate.data.user;
          console.log(arrayTask);
        } else {
          console.log(new Error(`UseEffect`));
        }
      } catch (err) {
        console.log(new Error(err));
      }
    };
    setContent()
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
