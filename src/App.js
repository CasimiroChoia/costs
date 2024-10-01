import './App.css';
import logo from './img/favicon.png';
import Rodape from './components/Rodape';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Project from './components/pages/Project';
import Contacts from './components/pages/Contacts';
import Projects from './components/pages/Projects';
import { Cabecalho } from './components/Cabecalho';
import Container from './components/layouts/Container';
import NewProject from './components/pages/NewProject';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Cabecalho logo={logo} />
        <Container customClassName='min-height'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/Company' element={<Company />} />
            <Route path='/Contacts' element={<Contacts />} />
            <Route path='/Projects' element={<Projects />} />
            <Route path='/Projects/:id' element={<Project />} />
            <Route path='/NewProject' element={<NewProject />} />
            <Route path='/NewProject' element={<NewProject />} />
          </Routes>
        </Container>
        <Rodape logo={logo} />
      </div>
    </BrowserRouter>
  );
}

export default App;
