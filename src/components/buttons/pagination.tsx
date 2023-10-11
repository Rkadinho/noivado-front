import React, { useState } from "react";
import '../../css/global.css';
import { Pagination } from "../../utils/interfaces";

export default function Paginations({ props }: Pagination) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      {Array.from({ length: Math.ceil(props.length / 8) }).map((_, index) => (
        <span key={index} onClick={() => paginate(index + 1)} className='m-2 p-2 bg-gold-40 numbers'>
          {index + 1}
        </span>
      ))}
    </div>
  );
}