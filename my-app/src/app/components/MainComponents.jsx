"use client";
import { useEffect, useState } from "react";
import { CiCircleCheck, CiEdit } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import useAPI from "../hooks/useAPI";
import { useRouter } from "next/navigation";

const MainComponents = () => {
  const { viewTask } = useAPI();
  const [arrayTask, setArrayTask] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const { deleteTask, doneTask} = useAPI();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const task = await viewTask();
        if (task.data && task.data.user) {
          const arrayTask = task.data.user;
          setArrayTask(arrayTask);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const handleClick = (taskID) => {
    router.push(`/${taskID}`);
  };
  useEffect(() => {
    const verificateDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (verificateDarkMode) {
      setDarkMode(verificateDarkMode);
      document.body.classList.toggle("bg-black", verificateDarkMode);
    }
  }, []);
  const deleteTaskFunction = async (taskID) => {
    const deleteTaskVar = await deleteTask(taskID);
    if (deleteTaskVar) {
      return true;
    } else {
      console.log(new Error("Erro na hora de deletar a task"));
    }
  };
  const editTaskFunction = (title, content, idTask) => {
    router.push(`/task/${title}/${content}/${idTask}/page`)
  }
  const doneTaskFunction = async (idTask) => {
    try {
      const doneTaskVar = await doneTask(idTask)
      if (doneTaskVar) {
        return true
      }
    } catch (err) {
      console.log(new Error(`${err}`))
    }
  }
  return (
    <main
      className={`px-4 min-w-full flex flex-col items-center ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-lg font-semibold">Tarefas</h1>
      <div>
        <table
          className={`table-fixed border ${
            darkMode ? "border-gray-600" : "border-slate-500"
          } border-collapse h-auto w-50% ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          <thead>
            <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
              <th
                className={`${
                  darkMode ? "border-gray-600" : "border-slate-600"
                } border px-4 py-2`}
              >
                ID
              </th>
              <th
                className={`${
                  darkMode ? "border-gray-600" : "border-slate-600"
                } border px-4 py-2`}
              >
                Título
              </th>
              <th
                className={`${
                  darkMode ? "border-gray-600" : "border-slate-600"
                } border px-4 py-2`}
              >
                Conteúdo da Tarefa
              </th>
              <th
                className={`${
                  darkMode ? "border-gray-600" : "border-slate-600"
                } border px-4 py-2`}
              >
                Feito?
              </th>
              <th
                className={`${
                  darkMode ? "border-gray-600" : "border-slate-600"
                } border px-4 py-2`}
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {arrayTask.map((task) => (
              <tr
                className={`${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } cursor-pointer`}
                key={task.idTask}
                onDoubleClick={() => handleClick(task.idTask)}
              >
                <td
                  className={`${
                    darkMode ? "border-gray-600" : "border-slate-600"
                  } border px-4 py-2`}
                >
                  {task.idTask}
                </td>
                <td
                  className={`${
                    darkMode ? "border-gray-600" : "border-slate-600"
                  } border px-4 py-2`}
                >
                  {task.title}
                </td>
                <td
                  className={`${
                    darkMode ? "border-gray-600" : "border-slate-600"
                  } border px-4 py-2`}
                >
                  {task.content}
                </td>
                <td
                  className={`${
                    darkMode ? "border-gray-600" : "border-slate-600"
                  } border px-4 py-2`}
                >
                  {task.done ? "Sim" : "Não"}
                </td>
                <td
                  className={`${
                    darkMode ? "border-gray-600" : "border-slate-600"
                  } border`}
                >
                  <div className="flex flex-row justify-between">
                    <button
                      className={`text-2xl hover:text-green-600 transition-colors ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                      onClick={(e) => doneTaskFunction(task.idTask)}
                    >
                      <i>
                        <CiCircleCheck />
                      </i>
                    </button>
                    <button
                      className={`text-2xl hover:text-red-600 transition-colors ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                      onClick={(e) => deleteTaskFunction(task.idTask)}
                    >
                      <i>
                        <MdCancel />
                      </i>
                    </button>
                    <button
                      className={`text-2xl hover:text-blue-600 transition-colors ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                      onClick={(e) => editTaskFunction(task.title, task.content, task.idTask)}
                    >
                      <i>
                        <CiEdit />
                      </i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p
        className={`mt-2 flex flex-row italic ${
          darkMode ? "text-gray-300" : "text-zinc-400"
        }`}
      >
        Se você clicar na tarefa, você irá conseguir ver o conteúdo inteiro!
      </p>
    </main>
  );
};
export default MainComponents;
