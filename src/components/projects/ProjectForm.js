import Carregar from '../layouts/Carregar'
import { useNavigate } from 'react-router-dom';
import { 
    useLayoutEffect, 
    useState 
} from 'react';
import style from './ProjectForm.module.css'
import Select from './form/Select';
import Input from './form/Input';
import Btn from './form/Btn'

const API = 'http://localhost:3001';
const urlCategorias = API + '/categorias';
const urlProjectos = API + '/projectos';


function ProjectForm({ propStyle, propContentButton }) {
    const navigate = useNavigate()
    // const location = useLocation()

    //#region  DECLARAÇÃO DE STATES UM NOVO PROJECTO
    const [projectName, setProjectName] = useState('')
    const [orcamento, setOrcamento] = useState()
    const [fetchErro, setFetchErro] = useState(false)
    const [category, setCategory] = useState([])
    const [choicedCategory, setChoicedCategory] = useState({})
    const [loading, setLoading] = useState(false)
    //#endregion

    const reBootForm = () => {
        // setChoicedCategory({...prevState,})
        setProjectName('')
        setOrcamento(0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valorDoOrcamento = orcamento;
        if (projectName === '' || !(parseInt(choicedCategory.id) >= 0)) {
            return alert('Preencha todos os campos.')
        }
        if (valorDoOrcamento < 1000) {
            alert('Não é possivel criar um projecto com esse valor.')
            return alert('Digite um valor acima de 1000 Kz')
        }

        const resp = await fetch(urlProjectos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName,
                orcamento,
                choicedCategory,
                cost: 0,
                services: []
            })

        })
            .then(resp => resp)
            .catch(erro => {

                console.log('ERRO AO ENVIAR DADOS AO SERVIDOR!', erro.message);
            })

        console.log(resp);

        // RESETANDO TODAS AS VARIAVEIS
        setChoicedCategory('')
        setProjectName('')
        setOrcamento(0)

        // REDIRECIONANDO PAGINA
        if (resp.ok !== true) {
            navigate('/Projects', {
                replace: true,
                relative: true, state: {
                    type: 'erro',
                    sms: 'o sistema não conseguio criar o projecto'
                }
            })
        } else {
            navigate('/Projects', {
                replace: true, relative: true, state: {
                    type: 'sucesso',
                    sms: 'projecto novo criado com sucesso'
                }
            })
        }
        e.preventDefault();
        console.log('formulario enviado');
    }
    //#region BUSCAR CATEGORIAS DO SERVIDOR
    useLayoutEffect(() => {
        const carregarCategorias = async () => {
            setLoading(true)
            const data = await fetch(urlCategorias)
                .then(resp => resp.json())
                .then(data => data)
                .catch(erro => {
                    setFetchErro(true)
                })

            setCategory(data)
            setLoading(false)
        }
        carregarCategorias()
    }, [])
    //#endregion

    if (loading) {
        // console.log(props);
        return (
            <Carregar />
        )
    }

    //#region RETORNARÁ O FORMULARIO

    return (
        (!fetchErro) ? (

            // CASO FOR PARA SUBSCREVER UM NOVO PROJECTO
            <div className={propStyle || style.form}>
                <Input
                    id='projectName'
                    type='text'
                    value={projectName || ''}
                    labelContent='nome do projecto'
                    placeholder='nome do Projecto'
                    handleChange={(e) => setProjectName(e.target.value)}
                />
                <Input
                    id='orcamento'
                    type='number'
                    value={orcamento || ''}
                    labelContent='orçamento'
                    placeholder='orçamento inicial'
                    handleChange={(e) => setOrcamento(e.target.value)}
                />
                <Select
                    id='category_id'
                    options={category || ['vazio']}
                    handleChange={(e) => {
                        // console.log(e.target.innerText);
                        setChoicedCategory({
                            id: Number(e.target.value),
                            name: e.target.innerText.split("\n")[e.target.value]
                        })
                    }}
                />
                <div className={style.btnContainer}>
                    <Btn type='reset' content='limpar dados' onClick={reBootForm} />
                    <Btn type='submit' content={propContentButton || 'criar projecto'} onClick={(e) => {
                        e.preventDefault();
                        (handleSubmit(e))
                    }} />
                </div>
            </div>
        ) : (
            // #region CASO NÃO CONSEGUIR SE CONECTAR AO SERVIDOR
            <div className='smsError'>
                erro ao buscar dados no servidor
            </div>
            //#endregion
        )
    )
    //#endregion
}

export default ProjectForm;