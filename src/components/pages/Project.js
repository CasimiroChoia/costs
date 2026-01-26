import style from "./Project.module.css";
import Carregar from "../layouts/Carregar";
import ServiceForm from "../projects/ServiceForm";
import { useLayoutEffect, useState } from "react";
import Container from "../layouts/Container";
import CardServicos from "../layouts/CardServico";
import { useNavigate, useParams } from "react-router-dom";
import UpdateForm from "../projects/form/UpdateForm";
import useLocalStorageState from "use-local-storage-state";
import { nanoid } from "nanoid";

function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projecto, setProjecto] = useState();
  const [loading, setLoading] = useState(true);
  const [serviceCost, setServiceCost] = useState(0);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [mostrarFormDeProjecto, setMostrarFormDeProjecto] = useState(true);
  const [projectos, setProjectos] = useLocalStorageState("projectos", []);
  if (!projectos) {
    setProjectos([]);
  }

  // TROCA DE FORMULARIO
  const TrocarFormularioDeProjecto = () => {
    setMostrarFormDeProjecto(!mostrarFormDeProjecto);
  };
  // ESTA FUNÇÃO IRÁ DA MONSTRAR UM FORMULARIO QUE TEM A FUNÇÃO DE CRIAR UM NOVO PROJECTO
  const TrocarNewService = () => {
    setShowServiceForm(!showServiceForm);
  };

  // ENVIAR UM NOVO SERVICO AO SERVIDOR
  const sendNewService = async (e) => {
    e.preventDefault();

    // VERIFICA SE OS INPUTS ESTIVEREM VAZIOS
    if (serviceName === "" || serviceDescription === "") {
      alert("Por Favor Preencha todos os dados");
      return false;
    }
    // VERIFICAR SE O VALOR ACTUAL DO SERVICO É SUFICIENTE PARA CRIAR O SERVIÇO
    if (Number(projecto.orcamento) < Number(serviceCost)) {
      alert("Essa Quantia é Muito Elevada Para Poder Criar Este Serviço.");
      return false;
    } else {
      projecto.orcamento = Number(projecto.orcamento) - Number(serviceCost);
      projecto.cost = Number(projecto.cost) + Number(serviceCost);
    }

    const newService = {
      id: nanoid(4),
      serviceName: serviceName,
      serviceDescription: serviceDescription,
      serviceCost: serviceCost,
      feito: true,
    };
    setLoading(true);
    const updatedProjects = projectos.map((p) =>
      p.id === projecto.id ? { ...p, services: [...p.services, newService] } : p
    );
    setProjectos(updatedProjects);
    setProjecto((prev) => projectos.find((p) => p.id === prev.id));
  };

  const handleUpdateForm = (e) => {
    //     // e.preventDefault()
    //     fetch("https://localhost:3001/projectos/" + id, {
    //       method: "PATCH",
    //       headers: "application/json",
    //       body: JSON.stringify(projecto),
    //     })
    //       .then((resp) => {
    //         console.log(resp);
    //       })
    //       .catch((erro) => {
    //         console.log(erro);
    //       });
  };

  useLayoutEffect(() => {
    // BUSCAR O PROJECTO DO SERVIDOR
    setProjecto(() => projectos.find((projecto) => projecto.id === id));
    // console.log(projecto);
  }, [id, projecto, projectos]);

  // efeito loading
  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1 * 100);
    return <Carregar />;
  }

  return (
    <Container customClassName={"column"}>
      <header className={style.header}>
        <h1 style={{ fontFamily: "ttf3" }}>{projecto.projectName}</h1>
        <button
          className={style.btn}
          onClick={() => navigate("/costs/Projects")}
        >
          voltar
        </button>
      </header>
      <div className={style.contentMain}>
        <div className={style.btnContainer}>
          <button className={style.btn} onClick={TrocarFormularioDeProjecto}>
            {mostrarFormDeProjecto
              ? "actualize seu projecto"
              : "veja seu projecto"}
          </button>
          {mostrarFormDeProjecto && (
            <button className={style.btn} onClick={TrocarNewService}>
              {showServiceForm
                ? "ocultar formulário de serviço"
                : "novo Serviço"}
            </button>
          )}
        </div>

        {/* ESTA CONDICÃO É A QUE RETORNA OS DADOS DO PROJECTO */}
        {mostrarFormDeProjecto === true ? (
          <div className={style.dadosDoProjecto}>
            <h1>Dados Do Projecto 📈📌</h1>
            <p>
              <strong>id 🆔:</strong> {projecto.id}
            </p>
            <p>
              <strong>nome do projecto 📋:</strong> {projecto.projectName}
            </p>
            <p>
              <strong>orçamento actual 💰:</strong>{" "}
              <span className={style.dinheiro}>{projecto.orcamento}</span>
            </p>
            <p data-id={projecto.choicedCategory.id}>
              <strong>categoria escolhida 🎨:</strong>{" "}
              {projecto.choicedCategory.name}
            </p>
            <p>
              <strong>total utilizado 💸:</strong>{" "}
              <span className={style.dinheiro}>{projecto.cost}</span>
            </p>
            <hr />

            {showServiceForm && (
              <>
                <h2
                  style={{ marginBottom: "1.2em", textTransform: "capitalize" }}
                >
                  crie um novo servico.
                </h2>
                <div>
                  {/* FORMULARIO DE SERVIÇOS */}
                  <ServiceForm
                    propSendNewService={(e) => {
                      setShowServiceForm(false);
                      sendNewService(e);
                    }}
                    projecto={projecto}
                    serviceCost={serviceCost}
                    serviceName={serviceName}
                    setServiceCost={(e) => setServiceCost(e)}
                    setServiceName={(e) => setServiceName(e)}
                    serviceDescription={serviceDescription}
                    setServiceDescription={(e) => setServiceDescription(e)}
                  />
                </div>
                <hr />
              </>
            )}

            {/* O CODIGO ABAIXO VAI EXIBIR TODOS OS SERVICOS REGISTRADOS */}
            <h2>serviços</h2>
            <div className={style.containerCard}>
              {projecto.services.length > 0 &&
                projecto.services.map((service, index) => {
                  // let i = index;
                  if (service !== undefined && service !== null) {
                    return (
                      <>
                      {/* <span key={index}></span> */}
                        <CardServicos
                          servico={service}
                          i={index}
                          projectoId={projecto.id}
                          projecto={projecto}
                        />
                      </>
                    );
                  }
                  return <></>;
                })}
            </div>

            {projecto.services.every((x) => x === null || x === undefined) && (
              <p style={{ textDecoration: "none", color: "darkred" }}>
                sem serviços neste projecto.
              </p>
            )}
          </div>
        ) : (
          <div>
            {/* EDITANDO PROJECTO ACTUAL */}
            <h2 style={{ marginBottom: "1.2em", textTransform: "capitalize" }}>
              editando o projecto.
            </h2>
            <UpdateForm
              name={projecto.projectName}
              orca={projecto.orcamento}
              propStyle={style.form}
              handleUpdateForm={(e) => handleUpdateForm(e)}
              propContentButton={"feito"}
            />
          </div>
        )}
      </div>
    </Container>
  );
}

export default Project;
