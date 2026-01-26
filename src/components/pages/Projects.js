import style from "./Projects.module.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Message from "../layouts/Message";
import Carregar from "../layouts/Carregar";
import CardProject from "../layouts/CardProject";
import useLocalStorageState from "use-local-storage-state";
import Btn from "../projects/form/Btn";
// import { createPortal } from "react-dom";

const Projects = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [projectos, setProjectos] = useLocalStorageState("projectos", []);
  if (!projectos) {
    setProjectos([]);
  }

  const ListaVazia = (lista) => {
    return (
      <div>
        <h1>Vazio</h1>
      </div>
    );
  };
  // VAI RETORNAR UMA LISTA JÁ RENDERIZADA
  const RenderizarLista = (lista) => {
    return (
      (lista !== undefined || lista?.length !== 0) &&
      lista?.map((projecto, index) => {
        return (
          <CardProject
            key={index}
            id={projecto.id}
            nome={projecto.projectName}
            categoria={projecto.choicedCategory}
            orcamento={projecto.orcamento}
            projecto={projecto}
          />
        );
      })
    );
  };

  // EXPORTANDO PROJECTOS
  const handleExport = (content) => {
    const name = window.prompt("Digite o seu nome abaixo") || "Desconhecido";
    const blob = new Blob([JSON.stringify({ projectos: content, by: name })], {
      type: "text/plain",
    });
    const link = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = link;
    a.download = "projects.choia";
    a.click();
  };

  //loading da pagina
  useEffect(() => {
    console.log(location);
    if (location.state?.imported) {
      let newProjects = location.state?.imported?.projectos;
      console.table(newProjects);
      setProjectos((prevState) => [...prevState, ...newProjects]);
      location.state = {};
    }

    // createPortal(document.querySelector("#root"),<dialog></dialog>);
  }, [location, setProjectos]);

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1 * 1000);
    return <Carregar />;
  }

  return (
    <>
      {location.state && (
        <Message type={location.state.type} sms={location.state.sms} />
      )}

      <div>
        {/* <dialog style={{ overflow: "hidden" }} open className={style.modal}>
          <h1>asdasd</h1>
          <div>{RenderizarLista(projectos)}</div>
        </dialog> */}
        <div className={style.header}>
          <h1>projectos</h1>
          <Link to="/costs/newProject" className={style.newProject}>
            criar Projecto
          </Link>
        </div>
        <section className={style.containerCard}>
          {projectos?.length !== 0
            ? RenderizarLista(projectos)
            : ListaVazia(projectos)}
        </section>
        {projectos.length !== 0 && (
          <section className={style.containerBtn}>
            <Btn
              content="exportar projectos"
              onClick={() => handleExport(projectos)}
            />
          </section>
        )}
      </div>
    </>
  );
};

export default Projects;
