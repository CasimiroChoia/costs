import { Link } from "react-router-dom";
// import { useState } from 'react'
import styles from "./Cabecalho.module.css";
import { useRef, useState } from "react";

const Cabecalho = (props) => {
  const [hide, setHide] = useState(true);
  const headerRef = useRef(null);
  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.content}>
        <a href="/costs">
          <img
            className="logo60"
            alt="logo"
            src={props.logo}
            draggable="false"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          />
        </a>
        <h1>costs</h1>
        <div
          onClick={() => setHide((prev) => !prev)}
          className={styles.hamburguer}
        ></div>
      </div>
      <nav
        className={`${styles.navbar} ${
          hide === false ? styles.show : "ocultado"
        }`}
        style={{ top: "84px" }}
      >
        <Link onClick={() => setHide(true)} to="/costs">
          Pagina Inicial
        </Link>
        <Link onClick={() => setHide(true)} to="/costs/Projects">
          Projectos
        </Link>
        <Link onClick={() => setHide(true)} to="/costs/Contacts">
          Contactos
        </Link>
      </nav>
    </header>
  );
};

export { Cabecalho };
