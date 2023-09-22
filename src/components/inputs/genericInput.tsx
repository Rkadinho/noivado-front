import React from "react";
import { Input } from '../../utils/interfaces';

export default function GenericInput({ text }: Input) {
  return(
    <div className="text-center">
      <p>{text}</p>
      <input />
    </div>
  )
} 