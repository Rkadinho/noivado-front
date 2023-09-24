import React, { useState, useEffect } from "react";
import '../css/global.css'
import Form from "../components/cards/form";
import Table from "../components/tables/tablesGuests";
import { Guest, Gift } from "../utils/interfaces";
import { tableGuest, tabelGift } from "../utils/data";

export default function ControlPanel() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);

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
      name: guest.name,
      code: guest.code
    }
  })

  const handleGifts = gifts.map((gift, i) => {
    return {
      name: gift.name,
      chooseBy: gift.chooseBy
    }
  })

  return(
    <div className="p-8">
      <div className="flex-center">
        <Form />
      </div>
      <div className="flex-center flex">
        <Table titles={tableGuest} contents={handleGuests}/>
        <Table titles={tabelGift} contents={handleGifts}/>
      </div>
    </div>
  )
}