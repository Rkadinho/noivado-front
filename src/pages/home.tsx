import React, { useState, useEffect } from "react";
import '../css/global.css';
import GenericButton from "../components/buttons/genericButton";

interface Convidado {
  id?: number;
  name: string;
  code: string
}

function Home() {
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [novoConvidado, setNovoConvidado] =useState<Convidado>({
    name: '',
    code: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoConvidado({
      ...novoConvidado,
      [name]: value
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:3000/guests/addGuest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoConvidado),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(`convidado ${data} adicionado a lista`);
    })
    .catch((error) => console.error(`Erro: ${error}`));
  }

  useEffect(() => {
    fetch('http://localhost:3000/guests/guests')
      .then((response) => response.json())
      .then((data) => setConvidados(data))
      .catch((error) => console.error('Erro:', error));
  }, []);

  return(
    <div className="flex-center bg-white-20">
      <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={novoConvidado.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Código:</label>
        <input
          type="text"
          id="code"
          name="code"
          value={novoConvidado.code}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Adicionar Usuário</button>
    </form>
      <p className="text-black-10 text-sm text-center pt-8 pl-8 pr-8 font-bold text-uppercase">
        Acima de tudo, porém, revistam-sem do amor, que é o elo perfeito
      </p>
      <p className="text-black-10 text-sm text-center pl-8 pr-8 font-bold text-underline">
        Colossense 3:14
      </p>
      <input />
      <ul>
        {convidados.map((convidado) => (
          <p key={convidado.id}>convidado: {convidado.name} | codigo: {convidado.code}</p>
        ))}
      </ul>
      <GenericButton text="ver lista"/>
    </div>
  );
}

export default Home;