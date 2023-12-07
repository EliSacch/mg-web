// portal
import ReactDOM from 'react-dom';
// hooks
import { useEffect } from 'react';
// style
import styles from './styles/Modal.module.css';

export default function Modal({ children, handleClose, showModal }) {
    
    /**
     * This function closes the modal if ESC jey is pressed
     * @param {Event} e 
     */
    function exitPressed(e) { 
        const exitKey = {
            ESC: 27
        };
        if(e.keyCode === exitKey.ESC) {
            handleClose();
        }
    }

    /** 
     * This function closes the modal if ESC key is pressed 
     */
    function closeModalEsc() {
        document.addEventListener('keydown', exitPressed);
        }


    const handleKeyDown = (e) => {
        const modal = document.getElementById("modal");
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (modal !== null & e.key.toLowerCase() === "tab") {
            const target = e.target;
            const last = (focusableElements.length) - 1;
            if (e.shiftKey) {
                if (target === focusableElements[0]) {
                    e.preventDefault();
                    focusableElements[last].focus();
                }
            } else {
                if (target === focusableElements[last]) {
                    e.preventDefault();
                    focusableElements[0].focus();
                }
            }
        }
    }

    useEffect(() => {
        if (showModal) {
            window.addEventListener("keydown", handleKeyDown);
            document.getElementById("modal").focus();
            closeModalEsc();
        }
        // clean up functions
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener('keydown', exitPressed);
        };
    }, [])

    return ReactDOM.createPortal((
        <div className={styles.modalbackdrop}>
            <div className={styles.modal} id="modal" tabIndex={-1}>
                <button onClick={handleClose} className={styles.close}>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </button>
                {children}
            </div>

        </div>
    ), document.body)
}
