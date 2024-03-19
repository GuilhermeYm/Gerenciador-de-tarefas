import React, { useState } from "react";
import "../app/globals.css";
import HeaderComponents from "@/app/components/HeaderComponents";
import useAPI from "@/app/hooks/useAPI";
const addtaskpage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("")
  const { addTask } = useAPI();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = addTask(title, content);
    if(task) {
      setMessage("")
    } else {
      setMessage('Deu algum erro na hora de adicionar a tarefa. Tente novamente')
    }
  };
  return (
    <>
      <header>
        <HeaderComponents />
      </header>
      <div className="flex justify-center h-screen bg-gray-100 items-center">
        <main className="flex flex-col bg-white rounded-lg shadow-md p-8">
          <h1 className="mb-3 underline text-xl text-center">Adicionar novo post</h1>
          {message && (
            <span>{message}</span>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Título da tarefa"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="content">Conteúdo</label>
              <input
                type="text"
                name="content"
                id="content"
                placeholder="Conteúdo da tarefa"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <input type="submit" value="Nova tarefa" />
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default addtaskpage;
