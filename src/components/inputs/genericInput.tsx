import React from "react";
import { Input } from '../../utils/interfaces';

export default function GenericInput({ text, type, id, name, value, onChange }: Input) {
  return(
    <div className="text-center">
      <p>{text}</p>
      <input type={type} id={id} name={name} value={value} onChange={onChange}/>
    </div>
  )
} 