import React, { useState } from "react";
import { Modals } from "../../utils/interfaces";
import { IoIosClose } from "react-icons/io";
import '../../css/components/modal.css';

export default function Modal({ isOpen, onClose, children }: Modals) {
  const closeModal = () => {
    onClose();
  };

  return isOpen ? (
      <div className="bg-white-30 text-center pb-8 modalContainer">
        <div onClick={closeModal} className="p-2 modalIcon">
          <IoIosClose />
        </div>
        {children}
      </div>
    ) : null;
};