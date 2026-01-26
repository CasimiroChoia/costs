import Carregar from "../layouts/Carregar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./ProjectForm.module.css";
import Select from "./form/Select";
import Input from "./form/Input";
import Btn from "./form/Btn";
import useLocalStorageState from "use-local-storage-state";
import { customAlphabet } from "nanoid";

// const API = "http://localhost:3001";
// const urlProjectos = API + "/projectos";

function ProjectForm({ propStyle, propContentButton }) {
  const navigate = useNavigate();
  const nanoid = customAlphabet("abcdefgh1234567890", 8);

  //#region  DECLARAÇÃO DE STATES UM NOVO PROJECTO
  // const [id] = useState("acasssasd");
  const [projectName, setProjectName] = useState("");
  const [orcamento, setOrcamento] = useState(0);
  const [choicedCategory, setChoicedCategory] = useState({name:""});
  const [loading, setLoading] = useState(true);
  const [projectos, setProjectos] = useLocalStorageState("projectos");
  //#endregion
  if (!projectos) {
    setProjectos([]);
  }

  const reBootForm = () => {
    setProjectName("");
    setOrcamento(0);
  };

  const handleSubmit = async (e) => {
    let valorDoOrcamento = orcamento;
    if (projectName === "" || !choicedCategory.name) {
      return alert("Preencha todos os campos.");
    }
    if (valorDoOrcamento < 1000) {
      alert("Não é possivel criar um projecto com esse valor.");
      return alert("Digite um valor acima de 1000 Kz");
    }

    setProjectos((prev) => {
      return [
        ...prev,
        {
          id: nanoid(),
          projectName,
          orcamento,
          choicedCategory,
          cost: 0,
          services: [],
        },
      ];
    });

    navigate("/costs/Projects", {
      // replace: true,
      state: {
        type: "sucesso",
        sms: "projecto " + projectName + " novo criado com sucesso",
      },
      ViewTransition: true,
    });

    // RESETANDO TODAS AS VARIAVEIS
    setChoicedCategory("");
    setProjectName("");
    setOrcamento(0);
    e.preventDefault();
    console.log("formulario enviado");
  };

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1 * 1000);

    return <Carregar />;
  }

  //#region RETORNARÁ O FORMULARIO

  return (
    // CASO FOR PARA SUBSCREVER UM NOVO PROJECTO
    <div className={propStyle || style.form}>
      <Input
        id="projectName"
        type="text"
        value={projectName || ""}
        labelContent="nome do projecto"
        placeholder="nome do Projecto"
        handleChange={(e) => setProjectName(e.target.value)}
      />
      <Input
        id="orcamento"
        type="number"
        value={orcamento || ""}
        labelContent="orçamento"
        placeholder="orçamento inicial"
        handleChange={(e) => setOrcamento(e.target.value)}
      />
      <Select
        id="category_id"
        handleChange={(e) => {
          setChoicedCategory(e.target.value);
          console.log(choicedCategory);
        }}
        value={choicedCategory}
        setValue={setChoicedCategory}
      />
      <div className={style.btnContainer}>
        <Btn type="reset" content="limpar dados" onClick={reBootForm} />
        <Btn
          type="submit"
          content={propContentButton || "criar projecto"}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        />
      </div>
    </div>
  );
  //#endregion
}

export default ProjectForm;
