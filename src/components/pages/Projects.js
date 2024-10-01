import style from './Projects.module.css'
import { useLocation, Link } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import Message from "../layouts/Message";
import Carregar from '../layouts/Carregar'
import CardProject from "../layouts/CardProject";



const Projects = () => {
    const location = useLocation();
    const API = 'http://localhost:3001';
    const urlProjectos = API + '/projectos';
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ligacaoComServidor, setLigacaoComServidor] = useState(false);

    const ListaVazia = (lista) => {
        return (
            lista.lenght === 0 && (
                <div>
                    <h1>Vazio</h1>
                </div>
            )
        )
    }
    // VAI RETORNAR UMA LISTA JÁ RENDERIZADA
    const renderizarLista = (lista) => {
        return (
            lista.length !== 0 &&

            lista.map((projecto, index) => {
                // console.log(ligacaoComServidor);
                return (
                    <CardProject
                        propKey={index}
                        id={projecto.id}
                        nome={projecto.projectName}
                        categoria={projecto.choicedCategory}
                        orcamento={projecto.orcamento}
                    />
                )

            })
        )
    }

    //#region CARREGAR PROJECTOS DO SERVIDOR
    useLayoutEffect(() => {
        async function carregarProjectos(urlProjectos) {
            setLoading(true)
            await fetch(urlProjectos)
                .then(resp => {
                    setLigacaoComServidor(resp.ok);
                    return resp.json();
                })
                .then(data => {
                    setLista(data)
                    return data;
                })
                .catch(erro => {
                    console.log(erro)
                })
            // setLigacaoComServidor(Boolean(data));
            setLoading(false)
            // console.log('A ligação com o servidor é ' + ligacaoComServidor);
        }
        carregarProjectos(urlProjectos)
    }, [urlProjectos, ligacaoComServidor])
    //#endregion

    //loading da pagina
    if (loading) {
        return <Carregar />
    }

    return (
        <>
            {location.state && <Message
                type={location.state.type}
                sms={location.state.sms}
            />}

            <div>
                <div className={style.header}>
                    <h1>projectos</h1>
                    <Link to='/newProject' className={style.newProject} >criar Projecto</Link>
                </div>
                <section className={style.containerCard}>
                    {
                        ligacaoComServidor === false ? (
                            <div className="smsError">
                                <h2 style={{ fontSize: '10vmin' }}>
                                    erro ao conectar com o servidor
                                </h2>
                            </div>
                        ) : (ligacaoComServidor === true)
                            ?
                            renderizarLista(lista)
                            :
                            ListaVazia(lista)
                    }
                </section>
            </div>
        </>
    )
}

export default Projects;