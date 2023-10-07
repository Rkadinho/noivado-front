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
    <div className="">
      <div className="background"></div>
      <div className="flex-center">
        <div className="text-center font-secondary photo"></div>
        <div className="button">
          <GenericButton text="LISTA DE CONVIDADOS" click={() =>  navigateRoute()}/>
        </div>
      </div>
    </div>
  );
}