import React from "react";
import '../../css/global.css';
import '../../css/components/genericButton.css';
import { Buttons } from "../../utils/interfaces";

export default function GenericButton({ text, type, click }: Buttons) {
  return (
    <div>
      <button className="bg-white-10 text-gold-40 text-sm text-center text-capitalize font-bold p-2 containerButton" type={type} onClick={click}>
        {text}
      </button>
    </div>
  );
}
