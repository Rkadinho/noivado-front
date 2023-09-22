import React from "react";
import '../../css/global.css';
import '../../css/components/genericButton.css';
import { Buttons } from "../../utils/interfaces";

export default function GenericButton({ text }: Buttons) {
  return (
    <div className="bg-gold-40 containerButton">
      <p className="text-white-20 text-lg text-center p-2 ">
        {text}
      </p>
    </div>
  );
}
