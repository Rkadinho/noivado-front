import React, { useState } from "react";
import '../../css/global.css'
import '../../css/components/form.css';
import GenericButton from "../buttons/genericButton";
import GenericInput from "../inputs/genericInput";
import { Gift, Guest } from "../../utils/interfaces";

export default function Form() {
  const [newGuest, setNewGuest] = useState<Guest>({
    name: '',
    code: ''
  });
  const [newGift, setNewGift] = useState<Gift>({
    name: ''
  });

  const handleChangeGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGuest({
      ...newGuest,
      [name]: value
    });
  }

  const handleChangeGift = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGift({
      ...newGift,
      [name]: value
    });
  }

  const handleSubmitGuest = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/guests/addGuest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuest)
      })

      if (res.ok) {
        console.log("Convidado adicionado com sucesso!");
        window.location.reload();
      } else {
        console.error("Erro ao adicionar convidado.");
      }
    } catch (error) {
      console.error("Erro ao adicionar convidado:", error);
    }
  }

  const handleSubmitGift = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/Gifts/addGift', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGift)
      })

      if(res.ok) {
        console.log('Presente adicionado com sucesso!');
        window.location.reload();
      } else {
        console.error('Erro ao adicionar presente.');
      }
    } catch(error) {
      console.error(`Erro ao adicionar presente ${error}`);
    }
  }

  return(
    <div className="bg-white-20 flex-center containerForm">
      <div className="p-8">
        <form onSubmit={handleSubmitGuest}>
          <div className="flex pb-8 formGuest">
            <div className="mr-8 marginMobile">
              <GenericInput 
                text="Convidado" 
                type="text" 
                id="name" 
                name="name" 
                value={newGuest.name} 
                onChange={handleChangeGuest}/>
            </div>
            <div className="mr-8 marginMobile">
              <GenericInput 
                text="Codigo" 
                type="text" 
                id="code" 
                name="code" 
                value={newGuest.code} 
                onChange={handleChangeGuest}/>
            </div>
            <GenericButton text="Adicionar convidado" type="submit"/>
          </div>
        </form>
        <form onSubmit={handleSubmitGift}>
          <div className="flex mb-8 formGift">
            <div className="mr-8 marginMobile">
              <GenericInput 
                text="Presente"
                type="text"
                id="name"
                name="name"
                value={newGift.name}
                onChange={handleChangeGift} />
            </div>
            <GenericButton text="Adicionar presente" type="submit"/>
          </div>
        </form>
      </div>
    </div>
  )
}