import React from "react";
import '../css/global.css';
import '../css/pages/home.css';
import GenericButton from "../components/buttons/genericButton";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const navigateRoute = () => {
    navigate('/listGuests');
  }

  return(
    <div className="containerHome">
      <div className="background"></div>
      <div className="flex-center">
        <div className="text-center font-secondary photo">
          <p className="data">06/08/2023</p>
        </div>
        <div className="button">
          <GenericButton text="LISTA DE CONVIDADOS" click={() =>  navigateRoute()}/>
        </div>
      </div>
    </div>
  );
}