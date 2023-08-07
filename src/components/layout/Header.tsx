import { useState } from "react";
import tw from "tailwind-styled-components";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";
import Logo from "@/components/layout/Logo";

const ScaledBsList = tw(BsList)`
text-4xl
`;

export default function Head() {
  const [isChecked, setIsChecked] = useState(false);
  // 이벤트 핸들러 함수 추가
  const handleDrawerToggle = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Header>
      <Link to="/">
        <Logo></Logo>
      </Link>
      <Drawer>
        <DrawerToggle
          id="my-drawer"
          type="checkbox"
          checked={isChecked}
          readOnly
        ></DrawerToggle>
        <DrawerContent onClick={handleDrawerToggle}>
          <DrawerButton htmlFor="my-drawer">
            <ScaledBsList></ScaledBsList>
          </DrawerButton>
        </DrawerContent>
        <DrawerSide>
          <DrawerOverlay
            htmlFor="my-drawer"
            onClick={handleDrawerToggle}
          ></DrawerOverlay>
          <SideBarContent>
            <Link to="/" onClick={handleDrawerToggle}>
              <Logo></Logo>
            </Link>
            <Link to="/test" onClick={handleDrawerToggle}>
              <SiderBarItem className="bg-regal-yellow">
                테스트 하러가기
              </SiderBarItem>
            </Link>
            <Link to="/stats" onClick={handleDrawerToggle}>
              <SiderBarItem className="bg-black text-white">
                통계 보러가기
              </SiderBarItem>
            </Link>
            <Link to="/board" onClick={handleDrawerToggle}>
              <SiderBarItem className="bg-black text-white">
                담벼락 보러가기
              </SiderBarItem>
            </Link>
            <SideBarFooter>
              <SideBarFooterContent>AYT Company</SideBarFooterContent>
              <SideBarFooterContent className="pointer-events-auto">
                <a
                  href="https://github.com/are-you-T"
                  target="_blank"
                  rel="are-you-T noreferrer"
                >
                  https://github.com/are-you-T
                </a>
              </SideBarFooterContent>
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

const Drawer = tw.span`
  flex
  w-auto
  h-auto
  h-9
`;

const DrawerButton = tw.label`
  btn
  drawer-button
  border-none
bg-transparent
p-0
min-h-0
h-full
`;

const DrawerToggle = tw.input`
  drawer-toggle
`;

const DrawerOverlay = tw.label`
  drawer-overlay
`;

const DrawerContent = tw.div`
  drawer-content
  h-9
`;

const DrawerSide = tw.div`
  drawer-side
  z-50
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

const SideBarFooter = tw.li`
  flex
  mt-auto
  pointer-events-none
`;

const SideBarFooterContent = tw.div`
  flex-end
  self-center
`;
// border-radius: 100px;
// border: 1px solid rgba(0, 0, 0, 0.00);
// background: #000;
// box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
