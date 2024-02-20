// style
import styles from './Form.module.css'

const TextArea = (props) => {
    return (
        <div className={styles.InputContainer}>
            <label htmlFor={props.name} className={styles.Label}>
                {props.title}
            </label>
            <textarea
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                rows={props.rows}
            />
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    )
}

export default TextArea;
