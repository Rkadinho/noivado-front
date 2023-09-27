import React, { useEffect, useState } from 'react';
import { Gift } from '../utils/interfaces';
import { useParams } from 'react-router';

export default function ListGifts() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const { guestName } = useParams();

  const updateChoseBy = (giftId: number) => {
    fetch('http://localhost:3000/gifts/toChose', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guestName: guestName,
        giftId: giftId
      })
    })
      .then((res) => {
        if(!res.ok) {
          console.log('Erro ao escolher presente');
        }
        return res.json();
      })
      .catch((error) => console.error(`Erro na chamada da api ${error}`))
  }

  useEffect(() => {
    fetch('http://localhost:3000/gifts/gifts')
      .then((res) => {
        if(!res.ok) {
          console.log('Erro ao buscar presentes');
        }
        return res.json();
      })
      .then((gifts) => setGifts(gifts))
      .catch((error) => console.error(`Erro na chama da api ${error}`));
  }, []);

  return(
    <div>
      <div className='text-center pt-8 mt-8'>
        <h1 className="font-secondary">Lista de Presentes</h1>
        <div className='p-4'>
          {gifts.map((gift) => (
              <p className="text-xl font-secondary" key={gift.id} onClick={() => {
                if (gift.id !== undefined) {
                  updateChoseBy(gift.id);
                }
              }}>{gift.name}</p>
          ))}
        </div>
      </div>
    </div>
  )
}