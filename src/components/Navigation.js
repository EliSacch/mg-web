// components
import { Link } from 'react-router-dom';
// style
import styles from './styles/Navigation.module.css';
import btnStyles from '../pages/styles/Buttons.module.css';

export default function Navigation(props) {

    const handleLogout = () => {
        props.handleClose();
        props.setCurrentMessage("Logged out");
        props.setCurrentMessageType("success");
        props.setJwtToken("");
    }

    const openLogoutModal = () => {
        props.setModalChildren(
            <>
                <h2>Logout</h2>
                <p>Vuoi effettuare il logout?</p>
                <button onClick={handleLogout} className={btnStyles.Btn}>Conferma</button>
            </>
        )
        props.handleOpen()
    }

    return (
        <nav className={styles.Nav}>
            <div className={styles.Logo}>
                <Link to="/"><h1>MG</h1></Link>
                { props.jwtToken != "" && <p>Ciao, user</p>}
            </div>
            <div className={styles.Links}>
            <Link to="/">Home</Link>
                {
                    props.jwtToken === ""
                        ? (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Sign up</Link>
                            </>
                        ) : (
                            <button onClick={openLogoutModal}>Logout</button>
                        )
                }

            </div>
        </nav>
    )
}
