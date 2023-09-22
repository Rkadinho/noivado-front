import React from "react";
import '../css/global.css'
import Form from "../components/cards/form";
import Table from "../components/tables/tablesGuests";

export default function ControlPanel() {
  return(
    <div className="p-8">
      <div className="flex-center">
        <Form />
      </div>
      <div className="flex-center">
        <Table />
        <div className="p-8">
          <Table />
        </div>
      </div>
    </div>
  )
}