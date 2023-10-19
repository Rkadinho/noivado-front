import React, { useState, useEffect } from "react";
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
        <div className="text-center font-secondary photo"></div>
        <div className="textHome grid text-gold-40 mt-8">
          <h1 className="textTitle flex-center">Jenifer & Ricardo</h1>
          <p className="textSubtitle flex-center font-secondary font-bold">Convidam para a celebração do seu noivado</p>
        </div>
        <div className="button">
          <GenericButton text="LISTA DE CONVIDADOS" click={() =>  navigateRoute()}/>
        </div>
      </div>
    </div>
  );
}