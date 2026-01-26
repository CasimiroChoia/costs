import style from "./Select.module.css";

function Select({ id, setValue, value }) {
  return (
    <div>
      <label htmlFor={id}>Selecione uma categoria</label>
      <select
        className={style.select}
        name={id}
        id={id}
        onChange={(e) => {
          setValue({ name: e.target.value });
          console.log(value);
        }}
        required
      >
        <option value="infra">infra</option>
        <option value="desenvolvimento">desenvolvimento</option>
        <option value="planeamento">planeamento</option>
        <option value="design">design</option>
        <option value="viagem">viagem</option>
        <option value="futuro">futuro</option>
        <option value="outros">outros</option>
      </select>
    </div>
  );
}

export default Select;

// const [categorias] = useState([
//   {
//     id: "1",
//     categoria: "infra",
//   },
//   {
//     id: "2",
//     categoria: "desenvolvimento",
//   },
//   {
//     id: "3",
//     categoria: "planeamento",
//   },
//   {
//     id: "4",
//     categoria: "design",
//   },
//   {
//     id: "5",
//     categoria: "viagem",
//   },
//   {
//     id: "6",
//     categoria: "futuro",
//   },
//   {
//     id: "7",
//     categoria: "outros",
//   },
// ]);
