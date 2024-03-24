"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";

const HeaderComponents = () => {
  const { isLogined } = useAPI();
  const [name, setName] = useState("");
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loggedInUserName = isLogined();
    setName(loggedInUserName || "");
    const verificateDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (verificateDarkMode) {
      setDarkMode(verificateDarkMode);
      document.body.classList.toggle("bg-black", verificateDarkMode);
    }
  }, []);

  const toggleDropdown = () => {
    setDropDownOpen(!dropdownOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    document.body.classList.toggle("bg-black", newDarkMode);
    window.location.reload()
  };

  return (
    <>
      <nav
        className={`flex flex-row justify-between p-4 ${
          darkMode ? "bg-gray-800 text-white shadow-gray-300 shadow-sm" : "bg-gray-200 text-gray-800"
        } mb-2`}
      >
        <h1 className="text-lg font-semibold">Gerenciador de tarefas</h1>
        <ul className="flex flex-row gap-3">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            {name ? (
              <Link
                href="/"
                className={`${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
                onClick={toggleDropdown}
              >
                {name}
                {dropdownOpen && (
                  <ul
                    className={`absolute ${
                      darkMode
                        ? "bg-gray-800 text-white shadow-gray-300 shadow-sm"
                        : "bg-white text-black"
                    } rounded-md right-2 mt-2 text-base px-3 flex flex-col space-y-1 py-2`}
                  >
                    <li className="">
                      <span>Nome de Usuário:</span>
                      <span className="ml-1">{name}</span>
                    </li>
                    <li>
                      <span>Mudar nome de usuário</span>
                    </li>
                    <li>
                      <span>Alterar senha</span>
                    </li>
                    <li>
                      <button
                        className={`text-sm font-medium focus:outline-none ${
                          darkMode ? "text-white" : "text-gray-800"
                        }`}
                        onClick={toggleDarkMode}
                      >
                        {darkMode ? "Modo Claro" : "Modo Escuro"}
                      </button>
                    </li>
                    <li>
                      <span>Sair</span>
                    </li>
                  </ul>
                )}
              </Link>
            ) : (
              <Link href="/registerpage">Registrar-se</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default HeaderComponents;
