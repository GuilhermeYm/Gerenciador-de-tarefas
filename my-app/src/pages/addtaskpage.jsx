import React, { useState, useEffect } from "react";
import useAPI from "@/app/hooks/useAPI";
import HeaderComponents from "@/app/components/HeaderComponents";
import { useRouter } from "next/router";
import "../app/globals.css";

const addtaskpage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const { addTask } = useAPI();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState("false")
  useEffect(() => {
    const verificateDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (verificateDarkMode) {
      setDarkMode(verificateDarkMode);
      document.body.classList.toggle("bg-black", verificateDarkMode);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = addTask(title, content);
    if (task) {
      setMessage("");
      router.push(`/`);
    } else {
      setMessage(
        "Deu algum erro na hora de adicionar a tarefa. Tente novamente"
      );
    }
  };

  return (
    <>
      <header>
        <HeaderComponents />
      </header>
      <div
        className={`flex justify-center h-screen ${
          darkMode ? "bg-black text-white" : "bg-gray-100"
        } items-center`}
      >
        <main className="flex flex-col bg-white rounded-lg shadow-md p-8">
          <h1 className="mb-3 underline text-xl text-center text-zinc-800">
            Adicionar novo post
          </h1>
          {message && <span>{message}</span>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-gray-800 mb-1 text-lg">
                Título
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Título da tarefa"
                onChange={(e) => setTitle(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="content" className="text-gray-800 mb-1 text-lg">
                Conteúdo
              </label>
              <input
                type="text"
                name="content"
                id="content"
                placeholder="Conteúdo da tarefa"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-start mt-1">
              <input
                type="submit"
                value="Nova tarefa"
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              />
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default addtaskpage;
