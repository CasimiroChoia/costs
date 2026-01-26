import { useEffect } from "react";
import style from "../layouts/CardProjectShared.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
// import Btn from "../projects/form/Btn";

const ProjectShared = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [projectos, setProjectos] = useLocalStorageState("projectos", []);
  if (!projectos) {
    setProjectos([]);
  }

  const ProjectShared = JSON.parse(params.get("body"));
  console.table(ProjectShared);

  //loading da pagina
  useEffect(() => {}, []);

  return (
    <>
      <div className={`${style.card}`} data-id={ProjectShared.id}>
        <h2>{ProjectShared.projectName}</h2>
        <span
          className={`${style.categoria} ${
            style[ProjectShared.choicedCategory?.name]
          }`}
        >
          {ProjectShared.choicedCategory?.name}
        </span>
        <span className={style.dinheiro}>
          Valor Inicial: <strong>{ProjectShared.orcamento}</strong>
        </span>
        <p className={style.dinheiro}>
          Nº De Serviços: {ProjectShared.services.length}
        </p>
        <span className={style.actions}>
          <button
            onClick={() => {
              setProjectos((prev) => [...prev, ProjectShared]);
              navigate("/costs/projects");
            }}
          >
            {/* <BiLink />  */}
            Adicionar Aos Projectos
          </button>
        </span>
        {/* <Btn content="Adicionar Aos Projectos" /> */}
      </div>
    </>
  );
};

export default ProjectShared;
