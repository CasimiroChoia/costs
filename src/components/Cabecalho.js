import { Link } from "react-router-dom"
// import { useState } from 'react'
import styles from './Cabecalho.module.css'

const Cabecalho = (props) => {

    return (
        <header className={styles.header}>
            <a href="/">
                <img 
                className="logo60" 
                alt="logo" 
                src={props.logo} 
                draggable='false'
                onContextMenu={(e)=>{
                    e.preventDefault();
                }}
                />
            </a>
            <h1>
                costs
            </h1>
            <nav>
                <Link to='/'>Pagina Inicial</Link>
                <Link to='/Projects'>Projectos</Link>
                {/* <Link to='/Company'>Compania</Link>
                <Link to='/Contacts'>Contactos</Link> */}
            </nav>

            {/* <div className="hamburguer"></div> */}

        </header>
    )
}

export { Cabecalho }