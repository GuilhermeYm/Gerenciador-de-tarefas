"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";

const HeaderComponents = () => {
  const { isLogined } = useAPI();
  const [name, setName] = useState("");

  useEffect(() => {
    const loggedInUserName = isLogined();
    setName(loggedInUserName || "");
  }, []);

  return (
    <>
      <nav className="flex flex-row justify-between p-4 bg-zinc-600 text-white mb-2">
        <h1>Gerenciador de tarefas</h1>
        <ul className="flex flex-row gap-3">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            {name ? (
              <Link
                href="/"
                className="text-white hover:text-gray-400 transition-colors duration-300"
              >
                {name}
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
