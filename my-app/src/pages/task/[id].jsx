import HeaderComponents from "@/app/components/HeaderComponents";
import React from "react";
import "@/app/globals.css";
import { useRouter } from "next/router";
const taskView = () => {
  const { query } = useRouter();
  const taskID = query?.id;
  return (
    <>
      <header>
        <HeaderComponents />
      </header>{" "}
      <main>
        <div className="flex flex-col justify-center items-center">
          <h2>Tarefa</h2>
          <div>{taskID}</div>
        </div>
      </main>
    </>
  );
};

export default taskView;
