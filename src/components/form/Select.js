// style
import styles from './Form.module.css'

const Select = (props) => {
    return (
        <div className={styles.InputContainer}>
            <label htmlFor={props.name} className={styles.Label}>
                {props.title}
            </label>
            <select 
                name={props.name}
                id={props.name}
                value={props.value}
                onChange={props.onChange}
            >
                <option value="">{props.placeHolder}</option>
                {props.options.map((option) => {
                    return (
                        <option
                            key={option.id}
                            value={option.id}
                            >
                                {option.value}
                        </option>
                    )
                })}
            </select>
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    )
}

export default Select;