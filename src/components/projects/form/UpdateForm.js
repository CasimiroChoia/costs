import Carregar from '../../layouts/Carregar'
import { useNavigate, useParams } from 'react-router-dom';
import {
    useLayoutEffect,
    useState
} from 'react';
import style from '../ProjectForm.module.css'
import Select from '../form/Select';
import Input from '../form/Input';
import Btn from '../form/Btn'


function UpdateForm({
    propStyle,
    propContentButton,
    name,
    orca,
    cate
}) {
    const navigate = useNavigate()
    const { id } = useParams()
    // const location = useLocation()

    //#region  DECLARAÇÃO DE STATES UM NOVO PROJECTO
    const [projectName, setProjectName] = useState(name ?? '')
    const [orcamento, setOrcamento] = useState(orca ?? 0)
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
        const resp = await fetch('http://localhost:3001/projectos/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectName,
                orcamento,
                choicedCategory,
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
            const data = await fetch('http://localhost:3001/categorias')
                .then(resp => resp.json())
                .then(data => data)
                .catch((erro) => {
                    console.log('ERRO DETECTADO => ' + erro);
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
                    value={projectName}
                    labelContent='nome do projecto'
                    placeholder='nome do Projecto'
                    handleChange={(e) => setProjectName(e.target.value)}
                />
                <Input
                    id='orcamento'
                    type='number'
                    value={orcamento}
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
                        handleSubmit(e)
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

export default UpdateForm;