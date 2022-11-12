import { render, screen } from "@testing-library/react";
import SideBar from './SideBar'

describe ('<SideBar/>', ()=>{
    it ("should render without errors", ()=>{
        render (<SideBar/>)
        screen.getByText('BridgeUs')
    })
})