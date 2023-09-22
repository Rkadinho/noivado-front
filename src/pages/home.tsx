import React from "react";
import '../css/global.css';
import GenericButton from "../components/buttons/genericButton";

function Home() {
  return(
    <div className="flex-center bg-white-20">
      <p className="text-black-10 text-sm text-center pt-8 pl-8 pr-8 font-bold text-uppercase">
        Acima de tudo, porém, revistam-sem do amor, que é o elo perfeito
      </p>
      <p className="text-black-10 text-sm text-center pl-8 pr-8 font-bold text-underline">
        Colossense 3:14
      </p>
      <GenericButton text="ver lista"/>
    </div>
  );
}

export default Home;