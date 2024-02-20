// style
import styles from './Form.module.css'

const Checkbox = (props) => {
    return (
        <div className={styles.InputContainer}>
            <input
                id={props.name}
                className={styles.Checkbox}
                type="checkbox"
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                checked={props.checked}
            />
            <label className={styles.Label} htmlFor={props.name}>
                {props.title}
            </label>
        </div>
    )
}

export default Checkbox;