import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import Home from "./pages/Home/Home";
import Camadas from "./pages/Camadas/Camadas";
import PersonalizarCamada01 from "./components/PersonalizarCamada01";
import ChecklistCamada01 from "./components/ChecklistCamada01";
import PersonalizarCamada02 from "./components/PersonalizarCamada02";
import ChecklistCamada02 from "./components/ChecklistCamada02";
import PersonalizarCamada03 from "./components/PersonalizarCamada03";
import ChecklistCamada03 from "./components/ChecklistCamada03";
import Sobre from "./pages/Sobre/Sobre";
import ScrollToTop from "./hooks/ScrollToTop";
import { DefaultLayout } from "./components/layouts/DefaultLayout";

export default function App() {
  return (
    <Router basename="/acessibilidade">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<DefaultLayout />}>
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/camadas" element={<Camadas />} />
          <Route
            path="/personalizar/camada-01"
            element={<PersonalizarCamada01 />}
          />
          <Route
            path="/checklist/camada-01"
            element={<ChecklistCamada01 />}
          />
          <Route
            path="/personalizar/camada-02"
            element={<PersonalizarCamada02 />}
          />
          <Route
            path="/checklist/camada-02"
            element={<ChecklistCamada02 />}
          />
          <Route
            path="/personalizar/camada-03"
            element={<PersonalizarCamada03 />}
          />
          <Route
            path="/checklist/camada-03"
            element={<ChecklistCamada03 />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
