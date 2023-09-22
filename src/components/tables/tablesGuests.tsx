import React from "react";
import { Tables } from "../../utils/interfaces";

export default function Table ({ titles, contents, codes }: Tables) {
  return (
    <div>
      <table>
        <thead>
            <tr>
              {titles?.map((title, i) => (
                <th key={i}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contents?.map((content, i) => (
              <tr key={i}>
                <td>{content.name}</td>
                <td>{content.code}</td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}