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
    name: '',
    choseBy: ''
  });

  const URL_ORIGIN = 'https://noivado-api.onrender.com/'

  const handleChangeGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTimeout(() => {
      setNewGuest({
        ...newGuest,
        [name]: value
      });
    }, 1500)
  }

  const handleChangeGift = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTimeout(() => {
      setNewGift({
        ...newGift,
        [name]: value
      });
    })
  }

  const handleSubmitGuest = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${URL_ORIGIN}guests/addGuest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuest)
      })

      if (res.ok) {
        setTimeout(() => {
          console.log("Convidado adicionado com sucesso!");
          window.location.reload();
        }, 1500)
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
      const res = await fetch(`${URL_ORIGIN}Gifts/addGift`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGift)
      })

      if (res.ok) {
        setTimeout(() => {
          console.log('Presente adicionado com sucesso!');
          window.location.reload();
        }, 1500)
      } else {
        console.error('Erro ao adicionar presente.');
      }
    } catch (error) {
      console.error(`Erro ao adicionar presente ${error}`);
    }
  }

  return (
    <div className="bg-gold-40 text-white-10 flex-center containerForm">
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
                onChange={handleChangeGuest} />
            </div>
            <div className="mr-8 marginMobile">
              <GenericInput
                text="Codigo"
                type="text"
                id="code"
                name="code"
                value={newGuest.code}
                onChange={handleChangeGuest} />
            </div>
            <GenericButton text="Adicionar convidado" type="submit" />
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
            <GenericButton text="Adicionar presente" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}