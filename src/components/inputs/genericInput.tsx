import React from "react";
import { Input } from '../../utils/interfaces';
import '../../css/components/genericInput.css'

export default function GenericInput({ text, type, id, name, value, onChange }: Input) {
  return(
    <div className="input text-center text-sm text-capitalize font-bold">
      <p className="text-xl font-secondary">{text}</p>
      <input type={type} id={id} name={name} value={value} onChange={onChange}/>
    </div>
  )
} 