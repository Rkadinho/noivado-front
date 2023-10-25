import React, { useState, useEffect } from "react";
import '../css/global.css'
import Form from "../components/cards/form";
import Table from "../components/tables/tables";
import { Guest, Gift } from "../utils/interfaces";
import { tableGuest, tableGift } from "../utils/data";
import '../css/pages/controlPanel.css';
import { useNavigate, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import TableGift from "../components/tables/tableGift";

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

  const URL_ORIGIN = 'https://noivadolist.onrender.com/'

  useEffect(() => {
    fetch(`${URL_ORIGIN}guests/guests`)
      .then((res) => res.json())
      .then((data) => {
        if (data.guests && Array.isArray(data.guests)) {
          setGuests(data.guests);
        } else {
          console.error('Dados de convidados ausentes ou em formato incorreto');
        }
      })
      .catch((error) => console.error(`Erro: ${error}`));

    fetch(`${URL_ORIGIN}gifts/gifts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.gifts && Array.isArray(data.gifts)) {
          setGifts(data.gifts);
        } else {
          console.error('Dados de convidados ausentes ou em formato incorreto');
        }
      })
      .catch((error) => console.log(`Erro: ${error}`))
  }, [URL_ORIGIN]);

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

  const confirmGuest = guests?.filter((guest) => {return guest.status == 'Estarei Presente'}).length;
  const notPresent = guests?.filter((guest) => {return guest.status == 'Não Irei'}).length;
  const giftsChose = gifts?.filter((gift) => {return gift.choseBy}).length;

  return (
    <div>
      {matchingCode?.name === guestName && validAdmin?.name === 'admin' ? (
        <div className="p-4">
          <div className="flex-center">
            <Form />
          </div>
          <div className="flex-center">
            <div className="mr-8">
              <h3 className="flex-center font-secondary">Pessoas confirmadas</h3>
              <p className="flex-center font-secondary">{confirmGuest}</p>
            </div>
            <div className="mr-8">
              <h3 className="flex-center font-secondary">Pessoas que não vão</h3>
              <p className="flex-center font-secondary">{notPresent}</p>
            </div>
            <div className="mr-8">
              <h3 className="flex-center font-secondary">Total de confirmaçao</h3>
              <p className="flex-center font-secondary">{notPresent + confirmGuest}</p>
            </div>
            <div className="mr-8">
              <h3 className="flex-center font-secondary">Total de convidados</h3>
              <p className="flex-center font-secondary">{guests.length}</p>
            </div>
            <div>
              <h3 className="flex-center font-secondary">total</h3>
              <p className="flex-center font-secondary">{(((notPresent + confirmGuest) /guests.length) * 100).toFixed(0)}%</p>
            </div>
          </div>
          <div className="flex-center">
            <div className="mr-8">
              <h3 className="flex-center font-secondary">Presentes Escolhidos</h3>
              <p className="flex-center font-secondary">{giftsChose}</p>
            </div>
            <div className="mr-8">
              <h3 className="flex-center font-secondary">Presentes totais</h3>
              <p className="flex-center font-secondary">{gifts.length}</p>
            </div>
            <div className="mr-8">
              <h3 className="flex-center font-secondary">total</h3>
              <p className="flex-center font-secondary">{((giftsChose / gifts.length) * 100).toFixed(0)}%</p>
            </div>
            <div>
              <h3 className="flex-center font-secondary">Pessoas que faltam escolher presente</h3>
              <p className="flex-center font-secondary">{(confirmGuest - giftsChose) - notPresent}</p>
            </div>
          </div>
          <Tabs>
            <TabList>
              <div className="flex-center p-2">
                <Tab>Tabela de Convidados</Tab>
                <Tab>Tabela de Presentes</Tab>
              </div>
            </TabList>

            <TabPanel>
              <Table titles={tableGuest} contents={handleGuests} />
            </TabPanel>

            <TabPanel>
              <TableGift titles={tableGift} contents={handleGifts} />
            </TabPanel>
          </Tabs>
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