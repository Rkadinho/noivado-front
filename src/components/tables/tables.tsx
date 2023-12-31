import React from "react";
import { Tables } from "../../utils/interfaces";
import { IoIosTrash } from "react-icons/io";
import '../../css/components/table.css';

export default function Table({ titles, contents }: Tables) {

  const URL_ORIGIN = 'https://noivadolist.onrender.com/'

  const handleDeleteGuest = async (id: number) => {
    try {
      const res = await fetch(`${URL_ORIGIN}guests/deleteGuest/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setTimeout(() => {
          console.log('Convidado excluido com sucesso!');
          window.location.reload();
        })
      } else {
        console.error('Erro ao excluir convidado.');
      }
    } catch (error) {
      console.error(`Erro ao excluir convidado ${error}`);
    }
  }

  return (
    <div className="p-4 table-container">
      <table className="table">
        <thead className="bg-gold-40 text-white-10 text-uppercase">
          <tr>
            {titles?.map((title, i) => (
              <th key={i} className="p-2">{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white-20 text-center text-capitalize">
          {contents?.map((content, i) => (
            <tr key={i}>
              <td className="p-2">{content.name}</td>
              <td className="p-2">{content.code || content.choseBy}</td>
              <td className="p-2">{content?.status}</td>
              <td className="p-2">
                <IoIosTrash onClick={() => {
                  handleDeleteGuest(content.id)
                }} color="red" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}