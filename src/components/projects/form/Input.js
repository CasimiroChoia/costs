import style from './Input.module.css'

function Input(props) {


    return (
        <div className={`${style.div}`}>
            <label htmlFor={props.id}>
                {props.labelContent}
            </label>
            <br />
            <input
                id={props.id}
                name={props.id}
                onChange={props.handleChange}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                required
            />
        </div>
    )
}

export default Input;