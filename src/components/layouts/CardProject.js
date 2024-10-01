import { FaEdit } from 'react-icons/fa';
import style from './CardProject.module.css'
import { BiTrash } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
function CardProject({ id, nome, orcamento, categoria, costs, servico, propKey }) {
    const navigate = useNavigate()

    const deleteProject = async (id, e) => {
        e.preventDefault();
        await fetch('http://localhost:3001/projectos/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            console.log(resp);
            navigate('/Projects', { state: { sms: 'Projecto Apagado', type: 'sucesso' } })
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }).catch(erro => {
            navigate('/Projects', { state: { sms: 'falha ao deletar projecto', type: 'erro' } })
            console.log('Aconteceu um erro => ' + erro.message);
        })
    }

    return (
        <div className={`${style.card}`} key={propKey}>
            <h3>{nome}</h3>
            <span className={`${style.categoria} ${style[categoria.name]}`}>{categoria.name}</span>
            <span className={style.dinheiro}>Dinheiro: <strong>{orcamento}</strong></span>
            <span className={style.actions}>
                <Link to={id} className={style.edit}>
                    <FaEdit /> editar
                </Link>
                <div role='button' className={style.delete} onClick={(e) => {
                    e.preventDefault();
                    if (window.confirm('Você tem a certeza que deseja apagar este projecto ?')) {
                        deleteProject(id, e)
                    }
                }}>
                    <BiTrash /> apagar
                </div>
            </span>
        </div>
    )
}

export default CardProject;