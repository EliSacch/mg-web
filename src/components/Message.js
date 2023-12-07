// portal
import ReactDOM from 'react-dom';
// hooks
import { useEffect } from 'react';
// style
import styles from './styles/Message.module.css';


export default function Message({ children, displayMessage, closeMessage, type }) {

    useEffect(() => {
        const timeout = setTimeout(closeMessage, 4000);
        return () => clearTimeout(timeout);
    }, [])


    return ReactDOM.createPortal((

        displayMessage && (
            <div className={styles.message}>
                <div className={styles[`${type}`]}>
                    <button onClick={() => closeMessage()} className={styles.close}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>
                    {children}
                </div>
            </div>
        )

    ), document.body)
}
