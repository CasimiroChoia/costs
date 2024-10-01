import style from './Btn.module.css'

function Btn({ type, content, onClick }) {

    return (
        <button className={style.btn} onClick={onClick} type={type}>{content}</button>
    )
}

export default Btn;