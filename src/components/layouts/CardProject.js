import style from "./CardProject.module.css";
import { FaEdit } from "react-icons/fa";
import { BiLink, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";

function CardProject({ id, nome, orcamento, categoria, projecto }) {
  const [, setProjectos] = useLocalStorageState("projectos");
  // console.log(id);

  // APAGAR PROJECTO
  const deleteProject = async (id, e) => {
    e.preventDefault();
    setProjectos((prevState) => prevState.filter((pro) => pro.id !== id));
  };

  return (
    <div className={`${style.card}`} data-id={id}>
      <h3>{nome}</h3>
      <span className={`${style.categoria} ${style[categoria?.name]}`}>
        {categoria?.name}
      </span>
      <span className={style.dinheiro}>
        Dinheiro: <strong>{orcamento}</strong>
      </span>
      <span className={style.actions}>
        <Link to={id} relative={true} className={style.edit}>
          <FaEdit /> editar
        </Link>
        <button
          className={style.delete}
          onClick={(e) => {
            e.preventDefault();
            if (
              window.confirm(
                "Você tem a certeza que deseja apagar este projecto ?"
              )
            ) {
              deleteProject(id, e);
            }
          }}
        >
          <BiTrash /> apagar
        </button>
        <button
          className={style.delete}
          onClick={(e) => {
            e.preventDefault();
            window.navigator.clipboard.writeText(
              window.location.href + "/shared?body=" + JSON.stringify(projecto)
            );
            console.log("Copiado");
          }}
        >
          <BiLink /> partilhar
        </button>
      </span>
    </div>
  );
}

export default CardProject;
