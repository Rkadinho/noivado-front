import React, { useEffect, useState } from 'react';
import { Gift } from '../utils/interfaces';
import { useParams } from 'react-router';
import '../css/pages/listGifts.css'
import Modal from '../components/modal/modal';
import GenericButton from '../components/buttons/genericButton';

export default function ListGifts() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { guestName } = useParams();

  const updateChoseBy = (giftId: any) => {
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

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
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
      <div className='text-center pt-8 mt-8 bg-gold-20'>
        <h1 className="font-secondary">Lista de Presentes</h1>
        <div className='p-4'>
          {gifts.map((gift) => (
              <p className={`text-xl font-secondary ${gift.choseBy ? 'chosen' : ''}`} key={gift.id} onClick={() => {
                if (!gift.choseBy && gift.id !== undefined) {
                  updateChoseBy(gift.id);
                } 
                if (gift.choseBy) {
                  openModal();
                }
              }}>{gift.name}</p>
          ))}
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <p>Este presente ja foi escolhido, tente outro!</p>
        <GenericButton text='OK' click={closeModal}/>
      </Modal>
    </div>
  )
}