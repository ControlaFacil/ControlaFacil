import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HeaderU } from "./components/HeaderU";
import { HomeU } from "./components/HomeU";
import { LoginU } from "./components/LoginU";
import { Cadastro } from "./components/Cadastro";
import { MeusDados } from "./components/MeusDados";
import './global.css';

function LayoutWithHeader() {
  const location = useLocation();
  const hideHeaderOnRoutes = ["/", "/cadastro"];

  return (
    <>
      {!hideHeaderOnRoutes.includes(location.pathname) && <HeaderU />}
      <Routes>
        <Route path="/" element={<LoginU />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<HomeU />} />
        <Route path="/meus-dados" element={<MeusDados />} />
      </Routes>
    </>
  );
}

export function App() {
  return (
    <Router>
      <LayoutWithHeader />
    </Router>
  );
}
