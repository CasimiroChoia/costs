import style from "./Contact.module.css";
// import { useNavigate } from "react-router-dom";

function Contacts() {

  const redes = [
    {
      name: "Facebook",
      link: "https://www.google.com/search?q=Casimiro+Choia+Facebook&oq=Casimiro+Choia+Facebook&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzQ2MWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8",
      image: require("../../img/social/facebook.png"),
    },
    {
      name: "Instagram",
      link: "https://instagram.com/casimirochoia",
      image: require("../../img/social/instagram.png"),
    },
    {
      name: "WhatsApp",
      link: "https://wa.me/244948409127",
      image: require("../../img/social/whatsapp.png"),
    },
    {
      name: "Telegram",
      link: "https://t.me/casimiro50",
      image: require("../../img/social/telegram.png"),
    },
  ];

  return (
    <>
      <h1>Pagina de Contactos</h1>
      <section className={style.section}>
        <figure>
          {true && (
            <img
              className={style.img}
              src={require("../../img/me/window.jpg")}
              alt="Casimiro Choia"
            />
          )}{" "}
          {false && (
            <img
              className={style.img}
              src={require("../../img/me/alone-prod.jpg")}
              alt="Casimiro Choia"
            />
          )}
        </figure>
        <div className={style.divSocial}>
          {redes.map((rede,index) => {
            return (
              <a
key={index}
                className={style.rede}
                target="_blank"
                rel="noreferrer"
                href={rede.link}
              >
                <img src={rede.image} alt={rede.name} title={rede.name} />
                <span>{rede.name}</span>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Contacts;
