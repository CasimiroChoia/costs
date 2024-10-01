import style from './Project.module.css';
import Carregar from "../layouts/Carregar";
import ServiceForm from '../projects/ServiceForm'
import {
    useLayoutEffect,
    useState
} from "react";
import Container from '../layouts/Container';
import CardServicos from '../layouts/CardServico';
import { useNavigate, useParams } from "react-router-dom";
import UpdateForm from '../projects/form/UpdateForm';


function Project() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [projecto, setProjecto] = useState();
    const [loading, setLoading] = useState(true);


    const [serviceCost, setServiceCost] = useState(0)
    const [serviceName, setServiceName] = useState('')
    const [serviceDescription, setServiceDescription] = useState('')
    const [newService, setNewService] = useState(false);
    const [mostrarFormularioDeProjecto, setMostrarFormularioDeProjecto] = useState(true);

    // TROCA DE FORMULARIO
    const TrocarFormularioDeProjecto = () => {
        setMostrarFormularioDeProjecto(!mostrarFormularioDeProjecto)
    }
    // ESTA FUNÇÃO IRÁ DA MONSTRAR UM FORMULARIO QUE TEM A FUNÇÃO DE CRIAR UM NOVO PROJECTO
    const TrocarNewService = () => {
        setNewService(!newService)
    }

    // setTimeout(() => {
    //     console.log(projecto);
    // }, 3000);

    // ENVIAR UM NOVO SERVICO AO SERVIDOR
    const sendNewService = async (e) => {
        e.preventDefault();
        // VERIFICA SE OS INPUTS ESTIVEREM VAZIOS
        if (serviceName === '' || serviceDescription === '') {
            alert('Por Favor Preencha todos os dados');
            return false;
        }
        // VERIFICAR SE O VALOR ACTUAL DO SERVICO É SUFICIENTE PARA CRIAR O SERVIÇO
        if (Number(projecto.orcamento) < Number(serviceCost)) {
            alert('Essa Quantia é Muito Elevada Para Poder Criar Este Serviço.');
            return false;
        } else {
            projecto.orcamento = Number(projecto.orcamento) - Number(serviceCost);
            projecto.cost = Number(projecto.cost) + Number(serviceCost);
        }
        projecto.services.push({
            serviceName: serviceName,
            serviceDescription: serviceDescription,
            serviceCost: serviceCost,
            feito: true
        })
        // console.log(projecto.services);
        setLoading(true)
        let resp = await fetch('http://localhost:3001/projectos/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(projecto)
            body: JSON.stringify({
                'orcamento': projecto.orcamento,
                'services': projecto.services,
                'cost': projecto.cost
            })
        })
        // console.log(resp);
        setLoading(false);
        // alert('dad')
    }

    const handleUpdateForm = (e) => {
        // e.preventDefault()
        fetch('https://localhost:3001/projectos/' + id, {
            method: 'PATCH',
            headers: 'application/json',
            body: JSON.stringify(projecto)
        })
            .then(resp => {
                console.log(resp)
            }).catch(erro => {
                console.log(erro);
            })
    }

    useLayoutEffect(() => {
        // BUSCAR O PROJECTO DO SERVIDOR
        async function getData() {
            setLoading(true)
            await fetch('http://localhost:3001/projectos/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setProjecto(data);
                    // return data;
                })
                .catch(erro => {
                    console.log('ERRO AO BUSCAR O PROJECTO DO SERVIDOR ' + erro.message);
                })
            // console.log('Resp => ' + JSON.stringify(resp));
            setLoading(false);
        }
        getData()
    }, [id])

    if (loading) {
        return <Carregar />
    }

    return (
        <Container customClassName={'column'}>
            <header className={style.header}>
                <h1 style={{ fontFamily: 'ttf3' }}>{projecto.projectName}</h1>
                <button className={style.btn} onClick={() => navigate('/Projects')}>
                    voltar
                </button>
            </header>
            <div className={style.contentMain}>
                <div className={style.btnContainer}>
                    <button className={style.btn} onClick={TrocarFormularioDeProjecto}>
                        {mostrarFormularioDeProjecto ? 'actualize seu projecto' : 'veja seu projecto'}
                    </button>
                    {mostrarFormularioDeProjecto && (<button className={style.btn} onClick={TrocarNewService} >
                        {newService ? 'ocultar formulário de serviço' : 'novo Serviço'}
                    </button>)}
                </div>

                {/* ESTA CONDICÃO É A QUE RETORNA OS DADOS DO PROJECTO */}
                {(mostrarFormularioDeProjecto === true) ? (
                    <div className={style.dadosDoProjecto}>
                        <h1>Dados Do Projecto 📈📌</h1>
                        <p>
                            <strong>id 🆔:</strong> {projecto.id}
                        </p>

                        <p>
                            <strong>nome do projecto 📋:</strong> {projecto.projectName}
                        </p>

                        <p>
                            <strong>orçamento actual 💰:</strong> <span className={style.dinheiro}>{projecto.orcamento}</span>
                        </p>

                        <p data-id={projecto.choicedCategory.id}>
                            <strong>categoria escolhida 🎨:</strong> {projecto.choicedCategory.name}
                        </p>

                        <p>
                            <strong>total utilizado 💸:</strong> <span className={style.dinheiro}>{projecto.cost}</span>
                        </p>
                        <hr />

                        {newService && (
                            <>
                                <h2 style={{ marginBottom: '1.2em', textTransform: 'capitalize' }}>crie um novo servico.</h2>
                                <div>
                                    <ServiceForm
                                        propSendNewService={(e) => {
                                            setNewService(false)
                                            sendNewService(e)
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


                        {/* ESTE CODIGO VAI EXIBIR TODOS OS SERVICOS REGISTRADOS */}
                        <h2>serviços</h2>
                        <div className={style.containerCard}>
                            {projecto.services.length > 0 && projecto.services.map((service, index) => {
                                // let i = index;
                                if (service !== undefined && service !== null) {
                                    return (
                                        <CardServicos
                                            servico={service}
                                            i={index}
                                            projectoId={projecto.id}
                                            projecto={projecto}
                                        />
                                    )
                                }
                                return (
                                    <>
                                    </>
                                )
                            })}
                        </div>

                        {projecto.services.every((x) => { return x === null || x === undefined }) && (
                            <p style={{textDecoration:'none',color:'darkred'}}>sem serviços neste projecto.</p>
                        )}
                    </div>
                ) : (
                    <div>
                        {/* EDITANDO PROJECTO ACTUAL */}
                        <h2 style={{ marginBottom: '1.2em', textTransform: 'capitalize' }}>editando o projecto.</h2>
                        <UpdateForm
                            name={projecto.projectName}
                            orca={projecto.orcamento}
                            propStyle={style.form}
                            handleUpdateForm={(e) => handleUpdateForm(e)}
                            propContentButton={'feito'}
                        />
                    </div>
                )}
            </div>
        </Container>
    )
}

export default Project;