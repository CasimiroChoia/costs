import style from './home.module.css'
import {
    Link,
    // useNavigate
} from "react-router-dom";
import Logo from '../../img/favicon.png';

function Home() {
    // const navigate = useNavigate()

    // const goToLocal = (local) => {
    //     navigate(local, { replace: true, state: { openForm: true } })
    // }


    return (
        <>
            <h2 className={`${style.titulo} ${style.textCenter}`}> Bem-vindo ao <span className={style.name}>costs</span> </h2>
            <p className={`${style.textCenter}`}>
                comece a gerenciar seus projectos agora mesmo!🏆💰
            </p>
            <Link to={'/NewProject'} className={style.link}>criar projecto</Link>
            {/* <button className={style.link} onClick={() => goToLocal('/Projects')} >criar projecto</button> */}
            <img src={Logo} className={style.ImgDestaque} alt='logo' />
        </>
    )
}

export default Home;