import Image from "next/image";
import HeaderComponents from "./components/HeaderComponents";
import FooterComponents from "./components/FooterComponents";
import MainComponents from "./components/MainComponents";

export default function Home() {
  return (
    <>
      <header>
        <HeaderComponents />
      </header>
      <div>
        <MainComponents />
      </div>
      <footer className="text-black flex flex-row justify-center mt-2">
        <FooterComponents />
      </footer>
    </>
  );
}
