import { FaTrash } from "react-icons/fa";
import style from './CardServico.module.css'
import { useState } from "react";
import { useParams } from "react-router-dom";


function CardServicos({ servico, projectoId, projecto, i }) {
    const [feito, setFeito] = useState(servico.feito)
    const { id } = useParams()
    // MUDA O VALOR DA PROPRIEDADE FEITO 
    const mudarFeito = async (e) => {
        e.preventDefault()
        // console.log(projecto.services[key]);
        const actual = projecto.services[i];
        actual.feito = !feito;
        projecto.services[i] = actual;

        const resp = await fetch('http://localhost:3001/projectos/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'services': projecto.services
            })
        })
        if (resp.ok) {
            // alert('mudança ' + resp.ok);
            setFeito((prevState) => !prevState)
        } else {
            alert('[ERRO]');
        }
    }
    // MUDA O VALOR DA PROPRIEDADE FEITO 
    const apagarServico = async (e) => {
        e.preventDefault()
        delete projecto.services[i];
        const resp = await fetch('http://localhost:3001/projectos/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'services': projecto.services
            })
        })
        if (resp.ok) {
            console.log('SUCESSO AO APAGAR');
            // window.location.reload()
        } else {
            console.log('[ERRO] ACONTECEU ALGUM ERRO AO APAGAR');
        }
    }

    return (
        <div Key={i} className={`${style.cardServico} ${servico.feito ? style.cardFeito : style.cardNaoFeito}`}>
            <h3>{servico.serviceName}</h3>
            <p>{servico.serviceDescription}</p>
            <p className={style.cost}>{servico.serviceCost}</p>
            <div className={style.actions}>
                <button title="APAGAR" onClick={(e) => {
                    if (window.confirm('Você tem a certeza que deseja apagar este serviço ?')) {
                        apagarServico(e)
                    }
                }}>
                    <FaTrash />
                </button>
                <button title="FEITO" onClick={(e) => mudarFeito(e)}>
                    {!feito ? '👎' : '👍'}
                </button>
            </div>
        </div>
    )
}

export default CardServicos;