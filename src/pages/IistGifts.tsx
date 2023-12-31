import React, { useEffect, useState } from 'react';
import { Gift, Guest } from '../utils/interfaces';
import { useParams, useNavigate } from 'react-router';
import '../css/pages/listGifts.css'
import Modal from '../components/modal/modal';
import GenericButton from '../components/buttons/genericButton';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ListGifts() {
  const [gifts, setGifts] = useState<Gift[] | null>(null);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenConfirm, setModalOpenConfirm] = useState(false);
  const [modalOpenInfo, setModalOpenInfo] = useState(false);
  const [modalOpenDesv, setModalOpenDesv] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [guests, setGuests] = useState<Guest[]>([]);

  const { guestName, code } = useParams();
  const navigate = useNavigate();

  const validGuestNames = guests.map((guest) => {
    return guest.name
  });

  const matchingCode = guests.find((guest) => {
    return guest.code === code
  })

  const checkGuestName = validGuestNames.includes(guestName);

  const checkChoseBy = gifts?.find((gift) => {
    return gift.choseBy === guestName
  })

  const renderGifts = () => {
    if (gifts === null) {
      return (
        <div className="text-gold-40 p-4 font-secondary">
          <Skeleton count={8} />
        </div>
      );
    }
    const indexOfLastGifts = currentPage * 8;
    const indexOFFirtsGifts = indexOfLastGifts - 8;
    let alphabeticGift = gifts.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    const currentGifts = alphabeticGift.slice(indexOFFirtsGifts, indexOfLastGifts);

    const handleClickGift = (gift: any) => {
      switch (true) {
        case !gift.choseBy && !checkChoseBy:
          openModalConfirm();
          setSelectedGift(gift);
          break;
        case gift.choseBy === guestName:
          openModalConfirmDesv();
          setSelectedGift(gift);
          break;
        case !gift.choseBy && checkChoseBy?.choseBy === guestName:
          openModalInfo();
          break;
        default:
          openModal();
          break;
      }
    }

    return currentGifts.map((gift) => (
      <p
        className={`
          font-secondary 
          text-xl
          textGift
          text-capitalize
          ${gift.choseBy ? 'chosen' : ''} 
          ${checkChoseBy ? 'disabled' : ''}
          ${gift.choseBy === guestName ? 'chosenByMe' : ''}`
        }
        key={gift.id}
        onClick={() => handleClickGift(gift)}
      >
        {gift.name
        }
      </p>
    ))
  }

  const URL_ORIGIN = 'https://noivadolist.onrender.com/'

  const updateChoseBy = (giftId: any) => {
    fetch(`${URL_ORIGIN}gifts/toChose`, {
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
        if (!res.ok) {
          console.log('Erro ao escolher presente');
        }
        return res.json();
      })
      .catch((error) => console.error(`Erro na chamada da api ${error}`))
    setTimeout(() => {
      closeModal();
      window.location.reload();
    }, 1000)
  }

  const unselectGift = (gift: any) => {
    fetch(`${URL_ORIGIN}gifts/unselect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: gift
      })
    })
      .then((res) => {
        if (!res.ok) {
          console.log('Erro ao desvincular o presente');
        } else {
          setSelectedGift(null);
          window.location.reload();
        }
      })
      .catch((error) => console.error(`Erro na chamada da API ${error}`));
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setModalOpenConfirm(false);
    setModalOpenInfo(false);
    setModalOpenDesv(false);
  }

  const openModalConfirm = () => {
    setModalOpenConfirm(true);
  }

  const openModalConfirmDesv = () => {
    setModalOpenDesv(true);
  }

  const openModalInfo = () => {
    setModalOpenInfo(true);
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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

    fetch(`${URL_ORIGIN}gifts/gifts`)
      .then((res) => {
        if (!res.ok) {
          console.log('Erro ao buscar presentes');
        }
        return res.json();
      })
      .then((data) => {
        if (data.gifts && Array.isArray(data.gifts)) {
          setGifts(data.gifts);
        } else {
          console.error('Dados dos presentes ausentes ou em formato incorreto')
        }
      })
      .catch((error) => console.error(`Erro na chama da api ${error}`));
  }, [URL_ORIGIN]);

  return (
    <div>
      {checkGuestName && matchingCode?.name === guestName ? (
        <div>
          <div className='text-center pt-8 mt-8 text-gold-40'>
            <h1>Lista de Presentes</h1>
            <div>
              <div className='font-secondary text-capitalize'>{renderGifts()}</div>
            </div>
            {gifts && gifts.length > 0 && (
              <div className='text-white-70 p-4 font-secondary pagination '>
                {Array.from({ length: Math.ceil(gifts.length / 8) }).map((_, index) => (
                  <span
                    key={index} 
                    onClick={() => paginate(index + 1)} 
                    className={`m-2 p-2 numbers ${currentPage === index + 1 ? 'bg-gold-20' : 'bg-gold-40'}`}>
                    {index + 1}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className='flex-center grid'>
            <h1 className='text-gold-40'>Paletas de cores dos presentes</h1>
            <div className='flex'>
              <div className='colorGifts black m-1 p-8'></div>
              <div className='colorGifts gray m-1 p-8'></div>
              <div className='colorGifts bege m-1 p-8'></div>
              <div className='colorGifts white m-1 p-8'></div>
            </div>
          </div>
          <div className='flex-center'>
            <Modal isOpen={modalOpen} onClose={closeModal}>
              <p className='font-secondary'>Este presente ja foi escolhido, tente outro!</p>
              <GenericButton text='OK' click={closeModal} />
            </Modal>
            <Modal isOpen={modalOpenConfirm} onClose={closeModal}>
              <p className='text-xl'>Atenção!</p>
              <p className='font-secondary'>Tem certeza que quer escolher este presente {selectedGift?.name}?</p>
              <p className='font-secondary'>Não se esqueça da paleta de cores do presente</p>
              <div className='flex-center'>
                <div className='colorGifts black m-2 p-4'></div>
                <div className='colorGifts gray m-2 p-4'></div>
                <div className='colorGifts bege m-2 p-4'></div>
                <div className='colorGifts white m-2 p-4'></div>
              </div>
              <div className='mb-8 mt-8'>
                <GenericButton text='Sim' click={() => updateChoseBy(selectedGift?.id)} />
              </div>
              <GenericButton text='Não' click={() => closeModal()} />
            </Modal>
            <Modal isOpen={modalOpenInfo} onClose={closeModal}>
              <h1>Atenção</h1>
              <p className='font-secondary'>
                Para escolher um novo presente deve desvincular o antigo!
                Para desvicunlar basta clicar no presente escolhido anteriormente.
              </p>
              <GenericButton text='Entendi' click={() => closeModal()} />
            </Modal>
            <Modal isOpen={modalOpenDesv} onClose={closeModal}>
              <p className='text-xl'>Atenção!</p>
              <p className='font-secondary'>Tem certeza que não quer mais esse {selectedGift?.name} como presente?</p>
              <div className='mb-8'>
                <GenericButton text='Sim' click={() => unselectGift(selectedGift?.id)} />
              </div>
              <GenericButton text='Não' click={() => closeModal()} />
            </Modal>
          </div>
        </div>
      ) : (<div className='flex-center'>
        <div className='grid'>
          <h1 className='font-secondary'>Pagina não existe</h1>
          <h1 className='font-secondary' onClick={() => navigate('/listGuests')}>voltar</h1>
        </div>
      </div>)}
    </div>
  )
}