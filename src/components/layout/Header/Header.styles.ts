// import tw from "twin.macro";
import tw from "tailwind-styled-components";
import { BsList } from "react-icons/bs";

export const ScaledBsList = tw(BsList)`
text-4xl
text-black
`;

export const Header = tw.header`
  flex
  flex-wrap
  w-[390px]
  m-auto
  h-auto
  shrink-0
  bg-regal-purple
  px-2.5
  py-5
  items-center
  justify-between
`;

export const Drawer = tw.span`
  flex
  w-auto
  h-auto
  h-9
`;

export const DrawerButton = tw.label`
  btn
  drawer-button
  border-none
bg-transparent
p-0
min-h-0
h-full
`;

export const DrawerToggle = tw.input`
  drawer-toggle
  text-black
`;

export const DrawerOverlay = tw.label`
  drawer-overlay
`;

export const DrawerContent = tw.div`
  drawer-content
  h-9
`;

export const DrawerSide = tw.div`
  drawer-side
  z-50
`;

export const SideBarContent = tw.ul`
  menu
  p-4
  w-80
  h-full
  bg-base-200
  text-base-content
  bg-regal-purple
`;

export const SiderBarItem = tw.li`
  mt-9
  btn
  btn-wide
  w-full
  h-14
  flex-shrink-0
  rounded-full
  shadow-lg
  border-none
`;

export const SideBarFooter = tw.li`
  flex
  mt-auto
  pointer-events-none
`;

export const SideBarFooterContent = tw.div`
  self-center
`;
// border-radius: 100px;
// border: 1px solid rgba(0, 0, 0, 0.00);
// background: #000;
// box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
