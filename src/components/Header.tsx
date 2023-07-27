import React from "react";
import tw from "tailwind-styled-components";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "./Button";
// import companyLogo from "../assets/logo.svg";
import Logo from "./Logo";
import { ReactComponent as LogoSvg } from '../assets/logo.svg';

export default function Head() {
  return (
    <Header>
      
      <Logo></Logo>
      <Drawer>
        <DrawerToggle id="my-drawer" type="checkbox"></DrawerToggle>
        <DrawerContent>
          <DrawerButton htmlFor="my-drawer">
            <BsList></BsList>
          </DrawerButton>
        </DrawerContent>
        <div className="drawer-side">
          <DrawerOverlay htmlFor="my-drawer"></DrawerOverlay>
          <SideBarContent>
            {"Sidebar content here"}
            <SiderBarItem>Sidebar Item 1</SiderBarItem>
            <SiderBarItem>Sidebar Item 2</SiderBarItem>
          </SideBarContent>
        </div>
      </Drawer>
    </Header>

  );
}

// <Logo></Logo>
// <Hamburger></Hamburger>
// <header className='w-full flex items-center justify-between p-4 text-2xl border-b border-zinc-600 mb-4'>
const Header = tw.header`
  flex
  flex-wrap
  content-center
  w-full
  h-auto
  shrink-0
`;


const Hamburger = tw.span`
`;

const Drawer = tw.span`
  flex
  w-auto
  h-auto
  ml-auto
`;

const DrawerButton = tw.label`
  btn
  drawer-button
`;

const DrawerToggle = tw.input`
  drawer-toggle
`;
const DrawerOverlay = tw.label`
  drawer-overlay
`;
const DrawerContent = tw.div`
  drawer-content
`;
const SideBarContent = tw.ul`
  menu
  p-4
  w-80
  h-full
  bg-base-200
  text-base-content
`;
const SiderBarItem = tw.li``;
{
  /* <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    { Page content here }

    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      { Sidebar content here }
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>

    </ul>
  </div> */
}
