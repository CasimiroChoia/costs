import "./App.css";
import logo from "./img/favicon.png";
import Rodape from "./components/Rodape";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Project from "./components/pages/Project";
import Contacts from "./components/pages/Contacts";
import Projects from "./components/pages/Projects";
import { Cabecalho } from "./components/Cabecalho";
import Container from "./components/layouts/Container";
import NewProject from "./components/pages/NewProject";
import ProjectShared from "./components/pages/ProjectShared";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Cabecalho logo={logo} />
        <Container customClassName="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/costs" element={<Home />} />
            <Route path="/costs/Company" element={<Company />} />
            <Route path="/costs/Contacts" element={<Contacts />} />
            <Route path="/costs/Projects" element={<Projects />} />
            <Route path="/costs/Projects/shared" element={<ProjectShared />} />
            <Route path="/costs/Projects/:id" element={<Project />} />
            <Route path="/costs/NewProject" element={<NewProject />} />
            <Route
              path="/*"
              element={
                <div>
                  <h1>Não encontrado</h1>
                </div>
              }
            />
          </Routes>
        </Container>
        <Rodape logo={logo} />
      </div>
    </BrowserRouter>
  );
}

export default App;
