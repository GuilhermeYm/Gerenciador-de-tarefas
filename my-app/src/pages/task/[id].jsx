import HeaderComponents from "@/app/components/HeaderComponents";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/router";
import useAPI from "@/app/hooks/useAPI";

const TaskView = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [taskContent, setTaskContent] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
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
          const foundTask = arrayTask.find(
            (task) => task.idTask === parseInt(id)
          );
          if (foundTask) {
            setTaskContent(foundTask.content);
            setTaskTitle(foundTask.title);
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
      </header>
      <main className="h-screen w-full flex justify-center">
        <div
          className={`flex flex-col items-center ${
            !darkMode ? "text-white" : "text-black"
          }`}
        >
          <h2
            className={`mt-8 text-2xl mb-4 font-semibold ${
              !darkMode ? "text-white border-b border-white" : "text-black "
            }`}
          >
            Tarefa
          </h2>
          <div
            className={`rounded-lg shadow-md p-6 max-w-md ${
              !darkMode ? "text-white bg-gray-900 shadow-gray-400 shadow-sm" : "text-black bg-white"
            }`}
          >
            <div
              className={`flex-col mb-4 ${
                !darkMode ? "text-white" : "text-black"
              }`}
            >
              <p className="text-lg font-semibold">Título da task:</p>
              <p>{taskTitle}</p>
            </div>
            <div
              className={`flex-col mb-4 ${
                !darkMode ? "text-white" : "text-black"
              }`}
            >
              <p className="text-lg font-semibold">Conteúdo da task:</p>
              <p>{taskContent}</p>
            </div>
            <div
              className={`flex-col mb-4 ${
                !darkMode ? "text-white" : "text-black"
              }`}
            >
              <p className="font-semibold text-lg ">Id da Task:</p>
              <p>{id}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TaskView;
