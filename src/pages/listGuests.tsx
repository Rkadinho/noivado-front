// src/components/ListaComponent.tsx
import React, { useState, useEffect } from 'react';
import { Guest } from '../utils/interfaces';
import '../css/global.css';
import Modal from '../components/modal/modal';
import GenericButton from '../components/buttons/genericButton';
import { useNavigate } from 'react-router-dom';
import GenericInput from '../components/inputs/genericInput';

export default function ListGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenCode, setModalOpenCode] = useState(false);
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const navigate = useNavigate();

  const openModal = (guest: Guest) => {
    setSelectedGuest(guest);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const openModalCode = () => {
    setModalOpenCode(true)
  }

  const navigateRoute = (status: string) => {
    navigate(`/listGifts/${selectedGuest?.name}`);
    if(!selectedGuest?.status) {
      updateStatus(status);
    }
  }

  const statusNegative = (status: string) => {
    updateStatus(status);
    setModalOpenCode(false);
  }

  const handleCodeVerifi = () => {
    if(selectedGuest) {
      if(enteredCode === selectedGuest.code) {
        closeModal();
        openModalCode();
      } else {
        alert('Codigo incorreto. Tente novamente')
      }
    }
  }

  const updateStatus = (status: string) => {
    fetch('http://localhost:3000/guests/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: selectedGuest?.name,
        status
      })
    })
      .then((res) => {
        if(!res.ok) {
          console.error('Erro ao atualizar o status do convidado');
        }
        return res.json();
      })
      .then(() => {
        const updatedGuest = guests.map((guest) => 
          guest.name === selectedGuest?.name ? { ...guest, status } : guest
          );
          setGuests(updatedGuest);
          closeModal();
      })
      .catch((error) => console.error(`Erro na chamada à api: ${error}`));
  }

  useEffect(() => {
    fetch('http://localhost:3000/guests/guests')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar os convidados');
        }
        return response.json();
      })
      .then((data) => setGuests(data))
      .catch((error) => console.error('Erro na chamada à API:', error));
  }, []);

  return (
    <div className='bg-image p-8'>
      <div className='text-center pt-8 mt-8'>
        <h1 className="font-secondary">Lista de Convidados</h1>
        <h3 className='font-secondary'>Clique no seu nome</h3>
        <div className='p-4'>
          {guests.map((guest) => (
            <p className="text-xl font-secondary" key={guest.id} onClick={() => openModal(guest)}>{guest.name}</p>
          ))}
        </div>
      </div>
      <div className='flex-center'>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <GenericInput text="Codigo" value={enteredCode} onChange={(e: any) => setEnteredCode(e.target.value)}/>
          <GenericButton text="OK" click={() => !selectedGuest?.status ? handleCodeVerifi() : navigateRoute('')}/>
        </Modal>
        <Modal isOpen={modalOpenCode && enteredCode === selectedGuest?.code && !selectedGuest.status} onClose={closeModal}>
          <div className='flex-center'>
            <GenericButton text='Aceito' click={() => navigateRoute('aceito')}/>
            <div className='m-4'>
              <GenericButton text='Náo irei, porém, mandarei o presente' 
                click={() => navigateRoute('Náo irei, porém, mandarei o presente')}/>
            </div>
            <GenericButton text='não irei' click={() => statusNegative('Náo irei')}/>
          </div>
        </Modal>
      </div>
    </div>
  );
}