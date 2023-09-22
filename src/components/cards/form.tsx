import React from "react";
import '../../css/global.css'
import '../../css/components/form.css';
import GenericButton from "../buttons/genericButton";
import GenericInput from "../inputs/genericInput";

export default function Form() {
  return(
    <div className="bg-white-20 flex-center containerForm">
      <div className="p-8">
        <div className="flex pb-8">
          <div className="mr-8">
            <GenericInput text="Convidado"/>
          </div>
          <div className="mr-8">
            <GenericInput text="Codigo"/>
          </div>
          <GenericButton text="Adicionar convidado"/>
        </div>
        <div className="flex">
          <div className="mr-8">
            <GenericInput text="Presente"/>
          </div>
          <GenericButton text="Adicionar presente"/>
        </div>
      </div>
    </div>
  )
}