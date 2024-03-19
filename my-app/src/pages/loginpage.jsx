import HeaderComponents from "@/app/components/HeaderComponents";
import React, { useState } from "react";
import "@/app/globals.css";
import useAPI from "@/app/hooks/useAPI";
import { useRouter } from "next/router";
const loginpage = () => {
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { authenticateUser } = useAPI();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAuthenticated = await authenticateUser(name, key);
    if (isAuthenticated) {
      setErrorMessage("")
      router.push("/");
    } else {
      setErrorMessage(
        "Credenciais inválidas. Por favor, verifique seu nome de usuário e senha."
      );
    }
  };
  return (
    <>
      <header>
        <HeaderComponents />
      </header>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <main className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Login</h1>
          <p className="italic mb-6 text-gray-600">
            Digite as informações de acordo com as suas!
          </p>
          {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-lg text-gray-800 mb-1">
                  Nome:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Nome de usuário"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="key" className="text-lg text-gray-800 mb-1">
                  Senha:
                </label>
                <input
                  type="password"
                  name="key"
                  id="key"
                  onChange={(e) => setKey(e.target.value)}
                  value={key}
                  placeholder="Senha de usuário"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="submit"
                  value="Logar"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default loginpage;
