// style
import styles from './styles/Header.module.css';

export default function Header({children}) {

    return (
        <div className={styles.Header}>
            {children}
        </div>
    )
}
