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
  const [modalOpenConfirm, setModalOpenConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)

  const { guestName } = useParams();

  const renderGifts = () => {
    const indexOfLastGifts = currentPage * 8;
    const indexOFFirtsGifts = indexOfLastGifts - 8;
    let alphabeticGift = gifts.sort((a,b) => {
      if(a.name && b.name) {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    const currentGifts = alphabeticGift.slice(indexOFFirtsGifts, indexOfLastGifts);
    return currentGifts.map((gift) => (
      <p 
        className={`text-xl ${gift.choseBy ? 'chosen' : ''}`} 
        key={gift.id}
        onClick={() => {
          if(!gift.choseBy && gift.id !== undefined) {
            openModalConfirm();
            setSelectedGift(gift);
          }
          if (gift.choseBy) {
            openModal();
          }
        }}
         >
          {gift.name}
      </p>
    ))
  }

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
      closeModal();
      window.location.reload();
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setModalOpenConfirm(false);
  }

  const openModalConfirm = () => {
    setModalOpenConfirm(true);
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
      <div className='text-center pt-8 mt-8 text-gold-40'>
        <h1>Lista de Presentes</h1>
        <div>
          <p className='font-secondary'>{renderGifts()}</p>
        </div>
        <div className='text-white-70 p-4 font-secondary pagination '>
        {Array.from({ length: Math.ceil(gifts.length / 8) }).map((_, index) => (
          <span key={index} onClick={() => paginate(index + 1)} className='m-2 p-2 bg-gold-40 numbers'>
            {index + 1}
          </span>
        ))}
        </div>
      </div>
      <div className='flex-center'>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <p>Este presente ja foi escolhido, tente outro!</p>
          <GenericButton text='OK' click={closeModal}/>
        </Modal>
        <Modal isOpen={modalOpenConfirm} onClose={closeModal}>
          <p className='text-xl'>Atenção!</p>
          <p className='font-secondary'>Tem certeza que quer escolher este presente {selectedGift?.name}?</p>
          <div className='mb-8'>
            <GenericButton text='Sim' click={() => updateChoseBy(selectedGift?.id)}/>
          </div>
          <GenericButton text='Não' click={() => closeModal()}/>
        </Modal>
      </div>
    </div>
  )
}