// hooks
import { useNavigate } from "react-router-dom"
// components
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// styles
import styles from './styles/GoBackButton.module.css'

export default function GoBackButton() {

    const navigate = useNavigate();

    const goBack = e => {
        e.preventDefault()
        navigate(-1)
    }

    return (
    <button type="button" onClick={goBack} className={styles.GoBackBtn}>
        <FontAwesomeIcon icon={faArrowCircleLeft} size='xl' />
    </button>
)
}