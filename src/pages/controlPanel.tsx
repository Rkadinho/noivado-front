import React, { useState, useEffect } from "react";
import '../css/global.css'
import Form from "../components/cards/form";
import Table from "../components/tables/tables";
import { Guest, Gift } from "../utils/interfaces";
import { tableGuest, tabelGift } from "../utils/data";
import '../css/pages/controlPanel.css';
import { useNavigate, useParams } from "react-router-dom";

export default function ControlPanel() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);

  const { guestName, code } = useParams();

  const navigate = useNavigate()

  const matchingCode = guests.find((guest) => {
    return guest.code === code;
  })

  const validAdmin = guests.find((guest) => {
    return guest.name === guestName
  })

  useEffect(() => {
    fetch('http://localhost:3000/guests/guests')
      .then((res) => res.json())
      .then((guest) => setGuests(guest))
      .catch((error) => console.error(`Erro: ${error}`));

      fetch('http://localhost:3000/gifts/gifts')
      .then((res) => res.json())
      .then((gift) => setGifts(gift))
      .catch((error) => console.log(`Erro: ${error}`))
  }, []);

  const handleGuests = guests.map((guest, i) => {
    return {
      id: guest.id,
      name: guest.name,
      code: guest.code,
      status: guest.status
    }
  })

  const handleGifts = gifts.map((gift, i) => {
    return {
      id: gift.id,
      name: gift.name,
      choseBy: gift.choseBy
    }
  })

  return(
    <div>
      {matchingCode?.name === guestName && validAdmin?.name === 'admin' ? (
        <div className="p-8">
          <div className="flex-center">
            <Form />
          </div>
          <div className="flex-center containerTable">
            <Table titles={tableGuest} contents={handleGuests}/>
            <Table titles={tabelGift} contents={handleGifts} />
          </div>
        </div>
      ) : (
        <div className='flex-center'>
        <div className='grid'>
          <h1 className='font-secondary'>Pagina não existe</h1>
          <h1 className='font-secondary' onClick={() => navigate('/loginAdmin')}>voltar</h1>
        </div>
      </div>
      )}
    </div>
  )
}