import React, { useState } from "react";
import '../../css/global.css'
import '../../css/components/form.css';
import GenericButton from "../buttons/genericButton";
import GenericInput from "../inputs/genericInput";
import { Guest } from "../../utils/interfaces";

export default function Form() {
  const [newGuest, setNewGuest] = useState<Guest>({
    name: '',
    code: ''
  });
  const [newGift, setNewGift] = useState<Guest>({
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

  const handleSubmitGuest = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:3000/guests/addGuest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGuest)
    })
    .then((res) => res.json())
    .then((guest) => {
      console.log(`Convidado ${guest} adicionado a lista`)
    })
    .catch((error) => console.error(`Erro: ${error}`))

    fetch('http://localhost:3000/gifts/addGift', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGift)
    })
    .then((res) => res.json())
    .then((guest) => {
      console.log(`Presente ${guest} adicionado a lista`)
    })
    .catch((error) => console.error(`Erro: ${error}`))
  }

  const handleSubmitGift = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:3000/gifts/addGift', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGift)
    })
    .then((res) => res.json())
    .then((guest) => {
      console.log(`Presente ${guest} adicionado a lista`)
    })
    .catch((error) => console.error(`Erro: ${error}`))
  }

  return(
    <div className="bg-white-20 flex-center containerForm">
      <div className="p-8">
        <form onSubmit={handleSubmitGuest}>
          <div className="flex pb-8">
            <div className="mr-8">
              <GenericInput 
                text="Convidado" 
                type="text" 
                id="name" 
                name="name" 
                value={newGuest.name} 
                onChange={handleChangeGuest}/>
            </div>
            <div className="mr-8">
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
          <div className="flex">
            <div className="mr-8">
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