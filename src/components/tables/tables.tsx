import React from "react";
import { Tables } from "../../utils/interfaces";
import { IoIosTrash } from "react-icons/io";
import '../../css/components/table.css'

export default function Table ({ titles, contents }: Tables) {

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/gifts/deleteGift/${id}`, {
       method: 'DELETE' 
      });

      if(res.ok) {
        console.log('Presente excluido com sucesso!');
      } else {
        console.error('Erro ao excluir presente.');
      }
    } catch(error) {
      console.error(`Erro ao excluir presente ${error}`);
    }
  }

  const handleDeletew = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/guests/deleteGuest/${id}`, {
       method: 'DELETE' 
      });

      if(res.ok) {
        console.log('Convidado excluido com sucesso!');
      } else {
        console.error('Erro ao excluir convidado.');
      }
    } catch(error) {
      console.error(`Erro ao excluir convidado ${error}`);
    }
  }

  return (
    <div className="p-4 table-container">
      <table className="table">
        <thead className="bg-gold-40 text-white-10 text-uppercase">
            <tr>
              {titles?.map((title, i) => (
                <th key={i} className="p-4">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white-20 text-center text-capitalize">
            {contents?.map((content, i) => (
              <tr key={i}>
                <td className="p-4">{content.id}</td>
                <td className="p-4">{content.name}</td>
                <td className="p-4">{content.code || content.choseBy}</td>
                <td className="p-4">
                  <IoIosTrash onClick={() => {
                    handleDelete(content.id); 
                    handleDeletew(content.id)
                  }} color="red"/>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}