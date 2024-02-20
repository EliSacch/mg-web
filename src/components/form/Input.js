// hooks
import { forwardRef } from "react";
// style
import styles from './Form.module.css'

const Input = forwardRef((props, ref) => {
    return (
        <div className={styles.InputContainer}>
        <label htmlFor={props.name} className={styles.Label}>
            {props.title}
        </label>
        <input
          id={props.name}
          ref={ref}
          type={props.type}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          className={props.className}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
        />
        <div className={props.errorDiv}>{props.errorMsg}</div>
      </div>
    )
})

export default Input