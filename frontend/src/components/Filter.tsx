import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import SplitButton from 'react-bootstrap/SplitButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';


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

export default function Filter (props: { category: string, options: string[] }): JSX.Element {
  const [selected, setSelected] = useState<string>(props.category)

  return (
    <div>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: purple;
      color: white;
    }
    `}
      </style>
      <DropdownButton variant = 'flat' id="dropdown-basic-button" title = {selected}>
        <Dropdown.Item>{props.category}</Dropdown.Item>
        <Dropdown.Divider />
        {
          props.options.map((option) => <Dropdown.Item key={option} onClick={() => {setSelected(option)}} >
            {option}
          </Dropdown.Item>)
        }
      </DropdownButton>
    </div>
  )
}
