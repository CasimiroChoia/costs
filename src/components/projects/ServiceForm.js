// import { useParams } from 'react-router-dom'
import Btn from './form/Btn'
import style from './serviceForm.module.css'

function ServiceForm({
    propSendNewService,
    projecto,
    serviceCost,
    serviceName,
    setServiceCost,
    setServiceName,
    serviceDescription,
    setServiceDescription
}) {
    // const { id } = useParams();
    // console.log(arguments);


    return (
        <div>
            <form
                className={style.formu} onSubmit={(e) => {
                    propSendNewService(e)
                }}>
                <div className={style.inputBox}>
                    <label>digite o nome do serviço</label>
                    <input
                        type='text'
                        inputMode='text'
                        value={serviceName}
                        minLength="4"
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder='digite o nome do servico'
                        autoCorrect='false'

                        required
                    />
                </div>
                <div className={style.inputBox}>
                    <label>digite a descrição do serviço </label>
                    <textarea
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        placeholder='digite a descrição do servico'
                        autoCorrect='false'

                        required
                    ></textarea>
                </div>
                <div className={style.inputBox}>
                    <label>digite qual será o custo do serviço</label>
                    <input
                        // id='serviceName'
                        type='number'
                        inputMode='numeric'
                        min="0"
                        value={serviceCost}
                        onChange={(e) => setServiceCost(e.target.value)}
                        placeholder='digite o nome do servico'

                        required
                    />
                </div>
                <div className={style.btnContainer}>
                    <Btn content={'feito'} type={'submit'} />
                </div>
            </form>
        </div>
    )
}

export default ServiceForm;