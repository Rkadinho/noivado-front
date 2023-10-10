import React, { useState } from "react";
import { Modals } from "../../utils/interfaces";
import { IoIosClose } from "react-icons/io";
import '../../css/components/modal.css';

export default function Modal({ isOpen, onClose, children }: Modals) {
  const closeModal = () => {
    onClose();
  };

  return isOpen ? (
      <div className="bg-gold-40 text-white-10 text-center modalContainer">
        <div onClick={closeModal} className="modalIcon">
          <IoIosClose />
        </div>
        {children}
      </div>
    ) : null;
};