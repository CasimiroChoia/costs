import style from './Select.module.css'

function Select({ id, options, handleChange }) {

    return (
        <div>
            <label htmlFor={id}>Selecione uma categoria</label>
            <select
                className={style.select}
                name={id} id={id}
                onChange={handleChange}
                required
            >
                <option value={'-1'}>selecione uma categoria</option>
                {options.lenght !== 0 && (
                    options.map((option, index) => (
                        <option key={index} value={option.id}>{option.categoria}</option>
                    ))
                )}
            </select>
        </div>
    )
}

export default Select;