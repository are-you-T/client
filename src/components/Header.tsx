import React from "react";
import tw from "tailwind-styled-components";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "./Button";
// import companyLogo from "../assets/logo.svg";
import Logo from "./Logo";
import { ReactComponent as LogoSvg } from "../assets/logo.svg";

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
        <DrawerSide>
          <DrawerOverlay htmlFor="my-drawer"></DrawerOverlay>
          <SideBarContent>
            <Logo></Logo>
            <SiderBarItem className="bg-regal-yellow">
              테스트 하러가기
            </SiderBarItem>
            <SiderBarItem className="bg-black text-white">
              통계 보러가기
            </SiderBarItem>
            <SiderBarItem className="bg-black text-white">
              담벼락 보러가기
            </SiderBarItem>
            <SideBarFooter>
              <SideBarFooterContent></SideBarFooterContent>
              <SideBarFooterContent></SideBarFooterContent>
            </SideBarFooter>
          </SideBarContent>
        </DrawerSide>
      </Drawer>
    </Header>
  );
}

const Header = tw.header`
  flex
  flex-wrap
  content-center
  w-full
  h-auto
  shrink-0
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

const DrawerSide = tw.div`
  drawer-side
`;

const SideBarContent = tw.ul`
  menu
  p-4
  w-80
  h-full
  bg-base-200
  text-base-content
  bg-regal-purple
`;

const SiderBarItem = tw.li`
  mt-10
  btn
  btn-wide
  w-100
  h-10
  flex-shrink-0
  rounded-tr-3xl
  shadow-lg
`;

const SideBarFooter = tw.div`
`;

const SideBarFooterContent = tw.div`
`;
// border-radius: 100px;
// border: 1px solid rgba(0, 0, 0, 0.00);
// background: #000;
// box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
