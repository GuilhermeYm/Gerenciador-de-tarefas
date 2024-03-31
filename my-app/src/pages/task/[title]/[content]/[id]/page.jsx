import HeaderComponents from "@/app/components/HeaderComponents";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { useRouter } from "next/router";
import useAPI from "@/app/hooks/useAPI";

const edittaskpage = () => {
  const router = useRouter();
  const { title, content, id } = router.query;
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { editTask } = useAPI();
  const handleSubmit = async (e, newTitle, newContent, idTask) => {
    e.preventDefault();
    console.log(newTitle, newContent, idTask);
    try { 
      if (newTitle.length === 0) {
        setNewTitle(title);
      } else if (newContent.length === 0) {
        setNewContent(content);
      } else {
        try {
          const edit = await editTask(newTitle, newContent, idTask);
          if (edit) {
            router.push(`/`);
            return true;
          }
        } catch (err) {
          console.log(new Error(err));
        }
      }
    } catch (err) {
      console.error(err)
    }
  };
  return (
    <>
      <header>
        <HeaderComponents />
      </header>
      <div className="flex justify-center h-screen bg-gray-100 items-center">
        <main className="flex flex-col bg-white rounded-lg shadow-md p-8">
          <h1 className="mb-3 underline text-xl text-center text-zinc-800">
            Editando task: {title}
          </h1>
          <form
            className="space-y-4"
            onSubmit={(e) => handleSubmit(e, newTitle, newContent, id)}
          >
            <div className="flex flex-col">
              <label htmlFor="newTitle">Novo título:</label>
              <input
                type="text"
                id="newTitle"
                name="newTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="newContent">Novo conteúdo:</label>
              <input
                type="text"
                name="newContent"
                id="newContent"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                value="Editar"
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              />
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default edittaskpage;
