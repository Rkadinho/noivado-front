// src/components/ListaComponent.tsx
import React, { useState, useEffect } from 'react';
import { Guest } from '../../utils/interface';
import '../../css/global.css';

function ListGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/guests/guests') // Assumindo que sua API Node.js esteja rodando na mesma origem (same-origin)
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
            <p className="text-xl font-secondary" key={guest.id}>{guest.name}</p>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default ListGuests;