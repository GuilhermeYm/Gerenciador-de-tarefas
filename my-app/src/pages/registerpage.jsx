import { useState, useEffect } from "react";
import useAPI from "@/app/hooks/useAPI";
import { useRouter } from "next/router";
import HeaderComponents from "@/app/components/HeaderComponents";
import Link from "next/link";
import "@/app/globals.css";

export default function RegisterPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");
  const { registerUser } = useAPI();
  const router = useRouter();

  useEffect(() => {
    const verificateDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (verificateDarkMode) {
      setDarkMode(verificateDarkMode);
      document.body.classList.toggle("bg-black", verificateDarkMode);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isRegistered = await registerUser(name, key, email);
    if (isRegistered) {
      router.push("/");
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
        <main className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold text-zinc-800 text-center">
            Registrar-se
          </h1>
          <p className="mt-1 text-zinc-400 italic text-sm">
            Você já tem uma conta?{" "}
            <Link href="/loginpage" className="semibold hover:text-blue-600">
              Clique aqui
            </Link>
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg text-gray-800 mb-1">
                Nome:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg text-gray-800 mb-1">
                Senha:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg text-gray-800 mb-1">
                E-mail:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-center">
              <input
                type="submit"
                value="Enviar"
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              />
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
