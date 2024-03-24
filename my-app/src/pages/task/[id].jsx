import HeaderComponents from "@/app/components/HeaderComponents";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/router";
import useAPI from "@/app/hooks/useAPI";

const TaskView = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [taskContent, setTaskContent] = useState("");
  const { viewTask } = useAPI();
  const { id } = router.query;

  useEffect(() => {
    // Verificar o modo escuro
    const verificateDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (verificateDarkMode) {
      setDarkMode(!darkMode);
      document.body.classList.toggle("bg-black", verificateDarkMode);
    }

    // Buscar a tarefa com base no ID
    const setContent = async () => {
      try {
        const viewTaskVerificate = await viewTask();
        if (viewTaskVerificate.data && viewTaskVerificate.data.user) {
          const arrayTask = viewTaskVerificate.data.user;

          // Encontrar a tarefa com base no ID
          const foundTask = arrayTask.find(task => task.idTask === parseInt(id));
          if (foundTask) {
            setTaskContent(foundTask.content);
          } else {
            console.log("Tarefa não encontrada");
          }
        } else {
          console.log(new Error(`UseEffect: Não há dados de usuário`));
        }
      } catch (err) {
        console.log(new Error(err));
      }
    };
    setContent();
  }, [id]); 

  return (
    <>
      <header>
        <HeaderComponents />
      </header>{" "}
      <main>
        <div className="flex flex-col justify-center items-center">
          <h2>Tarefa</h2>
          <div>
            <p>Conteúdo da task: {taskContent}</p>
            <p>Id da Task: {id}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default TaskView;
