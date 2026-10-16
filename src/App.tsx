import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import Home from "./pages/Home/Home";
import Camadas from "./pages/Camadas/Camadas";
import PersonalizarCamada from "./pages/PersonalizarCamada/PersonalizarCamada";
import { PersonalizarTipoTela } from "./pages/PersonalizarCamada/FluxoCamadaUm";
import ChecklistCamada from "./pages/ChecklistCamada/ChecklistCamada";
import Sobre from "./pages/Sobre/Sobre";
import ScrollToTop from "./hooks/ScrollToTop";
import { DefaultLayout } from "./components/layouts/DefaultLayout/DefaultLayout";

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<DefaultLayout />}>
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/camadas" element={<Camadas />} />
          <Route path="/personalizar/:camada" element={<PersonalizarCamada />} />
          <Route path="/personalizar/1/:tipoTela" element={<PersonalizarTipoTela />} />
          <Route path="/checklists/:camadaId" element={<ChecklistCamada />} />
        </Route>
      </Routes>
    </Router>
  );
}
