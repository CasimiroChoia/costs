import { FaTrash } from "react-icons/fa";
import style from "./CardServico.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

function CardServicos({ projecto, i }) {
  const { id } = useParams();
  const [projectos, setProjectos] = useLocalStorageState("projectos", []);
  if (!projectos) {
    setProjectos([]);
  }
  // const [thisProject, setThisProject] = useState(
  //   projectos.find((x) => x.id === id)
  // );
  const servico = projectos.find((x) => x.id === id).services[i];
  // console.log(thisProject);

  // const [feito, setFeito] = useState(Boolean(servico.feito));
  //   MUDA O VALOR DA PROPRIEDADE FEITO
  // const changeDone = () => {
  //   const actual = projecto.services[i];
  //   actual.feito = !feito;
  //   projecto.services[i] = actual;
  //   setThisProject({
  //     ...thisProject,
  //     services: [...thisProject.services].map((a) =>
  //       a?.id === servico.id ? { ...a, feito: !a.feito } : a
  //     ),
  //   });
  //   console.table(thisProject.services);
  //   setProjectos(projectos.map((b) => (b.id === thisProject.id ? thisProject : b))
  //   );
  //   setFeito((prevState) => !prevState);
  //   // window.location.reload();
  // };
  // console.table(projecto.services);
  //   MUDA O VALOR DA PROPRIEDADE FEITO
  const apagarServico = async (e) => {
    e.preventDefault();
    console.log(projecto);
    projecto.orcamento += Number(projecto.services[i].serviceCost);
    delete projecto.services[i];
    console.log(projecto);
    setProjectos(projectos.map((a) => (a.id ? projecto : a)));
  };

  return (
    <div
      Key={i}
      className={`${style.cardServico} ${
        true || servico.feito ? style.cardFeito : style.cardNaoFeito
      }`}
    >
      <h3>{servico.serviceName}</h3>
      <p>{servico.serviceDescription}</p>
      <p className={style.cost}>{servico.serviceCost}</p>
      <div className={style.actions}>
        <button
          title="APAGAR"
          type="button"
          onClick={(e) => {
            if (
              window.confirm(
                "Você tem a certeza que deseja apagar este serviço ?"
              )
            ) {
              window.navigator.clipboard.writeText(JSON.stringify(projectos));
              apagarServico(e);
            }
          }}
        >
          <FaTrash />
        </button>
        {/* <button
          title="FEITO"
          type="button"
          onClick={() => changeDone(servico.id)}
        >
          {feito === true ? "feito" : "desfazer"}
        </button> */}
      </div>
    </div>
  );
}

export default CardServicos;
