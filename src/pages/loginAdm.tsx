import React, { useState, useEffect } from "react";
import '../css/global.css';
import '../css/pages/loginAdmin.css'
import GenericButton from "../components/buttons/genericButton";
import { useNavigate } from "react-router-dom";
import GenericInput from "../components/inputs/genericInput";
import { Guest } from "../utils/interfaces";
import Modal from "../components/modal/modal";

export default function LoginAdmin() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [login, setLogin] = useState('');
  const [code, setCode] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const matchingCode = guests.find((guest) => guest.code === code)

  const handleLogin = () => {
    if (login === 'admin' && matchingCode && matchingCode.name === 'admin') {
      navigate(`/controlPanel/${login}/${code}`)
    }
    setOpenModal(true)
  }

  const modal = () => {
    setOpenModal(true)
    if(openModal) {
      setOpenModal(false)
    }
  }

  const URL_ORIGIN = 'https://noivado-api.onrender.com/'

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

  return(
    <div>
      <h1 className="flex-center text-gold-40">Jenifer & Ricardo</h1>
      <h1 className="flex-center text-gold-40">Noivado</h1>
      <div className="text-white-20 bg-gold-40 p-4 login">
        <GenericInput text="Login" value={login} onChange={(e: any) => setLogin(e.target.value)}/>
        <GenericInput text="Senha" value={code} onChange={(e: any) => setCode(e.target.value)} type="password"/>
        <div className="mt-8">
          <GenericButton text="Entrar" click={() => handleLogin()}/>
        </div>
      </div>
      <div className="flex-center">
        <Modal isOpen={openModal} onClose={modal}>
          <h1>Aviso!</h1>
          <p className="font-secondary">Usuario ou senha incorreta</p>
          <GenericButton text="Entendi" click={() => modal()}/>
        </Modal>
      </div>
    </div>
  );
}