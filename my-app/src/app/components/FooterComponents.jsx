"use client";
import React, { useEffect, useState } from "react";

const FooterComponents = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const verificateDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (verificateDarkMode) {
      setDarkMode(verificateDarkMode);
      document.body.classList.toggle("bg-black", verificateDarkMode);
    }
  }, []);
  return (
    <>
      <p className={`${darkMode ? "text-white" : "text-black"}`}>
        Feito por Guilherme
        <a
          href="https://github.com/GuilhermeYm"
          className={`${
            darkMode
              ? "text-white hover:text-zinc-300 border-l border-white"
              : "text-black hover:text-zinc-900 border-l border-zinc-950"
          }  ml-2 pl-2 transition-colors`}
        >
          Github
        </a>
      </p>
    </>
  );
};

export default FooterComponents;
