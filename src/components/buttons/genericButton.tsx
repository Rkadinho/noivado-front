import React from "react";
import '../../css/global.css';
import '../../css/components/genericButton.css';

interface Props {
  text: string;
}

function GenericButton({ text }: Props) {
  return (
    <div className="bg-gold-40 container">
      <p className="text-white-20 text-lg text-center p-2 ">
        {text}
      </p>
    </div>
  );
}

export default GenericButton;