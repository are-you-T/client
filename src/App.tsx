import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";
import tw from "tailwind-styled-components";

function App() {
    return (
        <Container>
            <Header />
            <Outlet />
            <Footer />
        </Container>
    );
}

const Container = tw.div`
  h-full
`;
export default App;
