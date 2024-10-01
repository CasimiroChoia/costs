import style from './Rodape.module.css'
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaInstagram, FaTelegram} from 'react-icons/fa';


const Rodape = (props) => {


    return (
        <footer className={`${style.rodape}`}>
            <div className={style.redes}>
                <Link to={'/'}>
                    <FaFacebook />
                </Link>
                <Link to={'/'}>
                    <FaGithub />
                </Link>
                <Link to={'/'}>
                    <FaInstagram />
                </Link>
                <Link to={'https://t.me/Casimiro50'}>
                    <FaTelegram />
                </Link>

            </div>
            <span className={style.copyright}><span style={{ color: 'yellow', fontFamily: 'font2', fontWeight: 'bolder' ,letterSpacing:'2px' }}>Coins</span> by @UpCasi Company</span>
        </footer>
    )
}

export default Rodape;