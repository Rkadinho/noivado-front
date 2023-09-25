import React from "react";
import '../../css/global.css';
import '../../css/components/genericButton.css';
import { Buttons } from "../../utils/interfaces";

export default function GenericButton({ text, type }: Buttons) {
  return (
    <div>
      <button className="bg-gold-40 text-white-20 text-sm text-center text-capitalize font-bold p-2 containerButton" type={type}>
        {text}
      </button>
    </div>
  );
}
