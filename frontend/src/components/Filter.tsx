import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import SplitButton from 'react-bootstrap/SplitButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'


/*eslint-disable */
export interface theFilter {
    categoryName : string,
    list : string[],

}

export default function Filter (): JSX.Element {
  return (
    <>
      <DropdownButton id="dropdown-basic-button" title = "filter">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
        </>
  )
}
