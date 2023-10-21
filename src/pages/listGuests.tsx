// src/components/ListaComponent.tsx
import React, { useState, useEffect } from 'react';
import { Guest } from '../utils/interfaces';
import '../css/global.css';
import '../css/pages/listGuest.css';
import Modal from '../components/modal/modal';
import GenericButton from '../components/buttons/genericButton';
import { useNavigate } from 'react-router-dom';
import GenericInput from '../components/inputs/genericInput';

export default function ListGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalOpenInfo, setModalOpenInfo] = useState(false);
  const [modalOpenInvite, setModalOpenInvite] = useState(false);
  const [modalOpenInstruction, setModalOpenInstruction] = useState(false);
  const [modalOpenErroCode, setModalOpenErroCode] = useState(false);
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const openModal = (guest: Guest) => {
    setSelectedGuest(guest);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setModalOpenInvite(false);
    setModalOpenStatus(false);
    setModalOpenInfo(false);
    setModalOpenInstruction(false);
    setModalOpenErroCode(false);
  }

  const openModalStatus = () => {
    setModalOpenStatus(true);
    setModalOpenInvite(false);
    if(selectedGuest?.status) {
      setModalOpenInfo(true);
    }
  }

  const openModalInvite = () => {
    setModalOpenInvite(true)
  }

  const openModalInfo = (status: string) => {
    setModalOpenInfo(true);
    setStatus(status);
  }

  const openModalInstruction = () => {
    setModalOpenInstruction(true);
  }

  const openModalOpenErroCode = () => {
    setModalOpenErroCode(true);
  }

  const navigateRoute = (status: string) => {
    navigate(`/listGifts/${selectedGuest?.name}/${enteredCode}`);
    if(!selectedGuest?.status) {
      updateStatus(status);
    }
  }

  const statusNegative = (status: string) => {
    updateStatus(status);
    setModalOpenStatus(false);
  }

  const handleCodeVerifi = () => {
    if(selectedGuest) {
      if(enteredCode === selectedGuest.code) {
        closeModal();
        openModalInvite();
      } else {
        closeModal();
        openModalOpenErroCode();
      }
    }
  }

  const renderGuests = () => {
    const indexOfLastGuest = currentPage * 8;
    const indexOfFirstGuest = indexOfLastGuest - 8;
    let alphabeticGuest = guests
    .filter(guest => guest.name !== 'admin')
    .sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    const currentGuests = alphabeticGuest.slice(indexOfFirstGuest, indexOfLastGuest);
    return currentGuests.map((guest) => (
      <p className="text-xl font-secondary" key={guest.id} onClick={() => openModal(guest)}>
        {guest.name}
      </p>
    ));
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const URL_ORIGIN = process.env.ORIGIN

  const updateStatus = (status: string) => {
    fetch(`${URL_ORIGIN}guests/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: selectedGuest?.name,
        status: status
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
    fetch(`${URL_ORIGIN}guests/guests`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar os convidados');
        }
        return response.json();
      })
      .then((data) => {
        if (data.guests && Array.isArray(data.guests)) {
          setGuests(data.guests);
        } else {
          console.error('Dados de convidados ausentes ou em formato incorreto');
        }
      })
      .catch((error) => console.error('Erro na chamada à API:', error));
  }, [URL_ORIGIN]);

  return (
    <div>
      <div className='text-center'>
        <h1 className="text-gold-40">Lista de Convidados</h1>
        <h3 className='text-xl text-gold-40 font-secondary'>Clique no seu nome se estiver na lista</h3>
        <div className='text-gold-40  p-4 font-secondary'>{renderGuests()}</div>
        <div className='text-white-70 p-4 font-secondary pagination '>
        {Array.from({ length: Math.ceil(guests.length / 8) }).map((_, index) => (
          <span key={index} onClick={() => paginate(index + 1)} className='m-2 p-2 bg-gold-40 numbers'>
            {index + 1}
          </span>
        ))}
      </div>
      </div>
      <div className='flex-center modal'>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <div className='mb-2'>
            <GenericInput text="Codigo" value={enteredCode} onChange={(e: any) => setEnteredCode(e.target.value)}/>
          </div>
          <GenericButton text="OK" click={() => handleCodeVerifi()}/>
        </Modal>
        <Modal isOpen={modalOpenInvite} onClose={closeModal}>
          <div>
            <h1>Jenifer</h1>
            <h1>&</h1>
            <h1>Ricardo</h1>
            <p className='font-secondary text-xl'>Convidam Para Seu Noivado Que Será Realizado No Dia</p>
            <h1>17 | 12 | 23</h1>
            <p>Ás 13:30 horas</p>
            <p className='font-secondary'>ACIMA DE TUDO, PORÉM, REVISTAM-SE DO AMOR, QUE É O ELO PERFEITO</p>
            <p className='font-secondary'>COLOSSENSES 3:14</p>
            <p className='font-secondary'>Rua loanda, 205 - Vasco da Gama</p>
            <GenericButton text='ENTENDI' click={() => openModalStatus()}/>
          </div>
        </Modal>
        <Modal isOpen={modalOpenStatus && enteredCode === selectedGuest?.code && !selectedGuest.status} onClose={closeModal}>
          <div className='flex-center containerStatus'>
            <GenericButton text='Estarei Presente' click={() => openModalInfo('Estarei Presente')}/>
            <div className='m-4'>
              <GenericButton text='Náo irei, porém, mandarei o presente' 
                click={() => navigateRoute('Náo irei, porém, mandarei o presente')}/>
            </div>
            <GenericButton text='não irei' click={() => statusNegative('Náo irei')}/>
          </div>
        </Modal>
        <Modal isOpen={modalOpenInfo} onClose={closeModal}>
          <div className='flex-center grid'>
            <h1>Aviso!</h1>
            <p className='font-secondary'>
              Vai ser um prazer te receber nesse dia, 
              mas fica ligado que, após confirmar presença a entrega do presente é obrigatória.
            </p>
            <GenericButton text='ENTENDI' click={() => openModalInstruction()}/>
          </div>
        </Modal>
        <Modal isOpen={modalOpenInstruction} onClose={closeModal}>
          <div className='flex-center grid'>
            <h1>Manual do convidado</h1>
            <ol className='font-secondary'>
              <li>
                Vai ser um prazer receber você no nosso dia especial, 
                mas lembrando que, de branco só os NOIVOS
              </li>
              <li>
                Não vejo a hora de celebramos juntos essa nova etapa, mas fique
                atento na hora de confirmar sua presença e escolha o presente. Após
                escolher o presente a entrega do mesmo será obriga
              </li>
              <li>
                Em caso de alguma dúvida, ente em contato com os noivos para esclarecimento,
                para não haver nenhuma dificuldade que te impeça de estar ao nosso lado
                nesse grande dia
              </li>
              <li>
                Contato dos noivos:
                <br/>
                Jenifer: 81 996513553
                <br/>
                Ricardo: 81 994205468
              </li>
            </ol>
            <GenericButton text='ENTENDI' click={() => navigateRoute(status)}/>
          </div>
        </Modal>
        <Modal isOpen={modalOpenErroCode} onClose={closeModal}>
          <p className='font-secondary'>Codigo incorreto, tente novamente</p>
          <GenericButton text='FECHAR' click={() => closeModal()}/>
        </Modal>
      </div>
    </div>
  );
}