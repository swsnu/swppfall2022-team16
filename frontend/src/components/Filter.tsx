import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

/*eslint-disable */
export interface theFilter {
    categoryName : string,
    list : string[],

}

export const filters = [
  { category: "artist", options: ["aespa", "BTS"]},
  { category: "color", options: ["red", "blue", "black", "white"]},
  { category: "size", options: ["S", "M", "L", "XL"]}
]

export default function Filter (props: { category: string, options: string[], handler: (remove: string, add: string) => void }): JSX.Element {
  const [selected, setSelected] = useState<string>(props.category)

  const selectedHandler = (option: string) => {
    props.handler(selected, props.category === option ? '' : option)
    setSelected(option)
  }

  return (
    <div>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: transparent;
      color: #5A5A5A;
    }
    `}
      </style>
      <DropdownButton variant = 'flat' id="dropdown-basic-button" title = {selected}>
        <Dropdown.Item onClick={() => {selectedHandler(props.category)}}>{props.category}</Dropdown.Item>
        <Dropdown.Divider />
        {
          props.options.map((option) => <Dropdown.Item key={option} onClick={() => {selectedHandler(option)}} >
            {option}
          </Dropdown.Item>)
        }
      </DropdownButton>
    </div>
  )
}
