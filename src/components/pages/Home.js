import style from "./home.module.css";
import {
  Link,
  useNavigate,
  // useNavigate
} from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import Logo from "../../img/favicon.png";

function Home() {
  const navigate = useNavigate();
  const [projectos, setProjectos] = useLocalStorageState("projectos", []);
  if (!projectos) {
    setProjectos([]);
  }
  return (
    <>
      <h2 className={`${style.titulo} ${style.textCenter}`}>
        {" "}
        Bem-vindo ao <span className={style.name}>costs</span>{" "}
      </h2>
      <p className={`${style.textCenter}`}>
        comece a gerenciar seus projectos agora mesmo!🏆💰
      </p>
      <Link to={"/costs/NewProject"} className={style.link} style={{"--delay":"0.5s"}}>
        criar projecto
      </Link>
      <label htmlFor="import_file" className={[style.link]} style={{"--delay":"1s"}}>
        importar
      </label>
      {/* <button className={style.link} onClick={() => goToLocal('/Projects')} >criar projecto</button> */}
      <img src={Logo} style={{"--delay":"1.5s"}} className={style.ImgDestaque} alt="logo" />
      <input
        id="import_file"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
              let imported = JSON.parse(e.target.result);
              console.log(imported);

              setTimeout(() => {
                navigate("/costs/projects", {
                  state: { imported },
                });
              }, 0);
            };
          }
        }}
        type="file"
        accept=".choia"
      />
    </>
  );
}

export default Home;
