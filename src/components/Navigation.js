// components
import { Link } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
// style
import styles from './styles/Navigation.module.css';
import btnStyles from '../pages/styles/Buttons.module.css';
import Logo from './Logo';


export default function Navigation(props) {

    const openLogoutModal = () => {
        props.setModalChildren(
            <>
                <h2>Logout</h2>
                <p>Vuoi effettuare il logout?</p>
                <button onClick={() => props.handleLogout()} className={btnStyles.Btn}>Conferma</button>
            </>
        )
        props.handleOpen()
    }

    return (
        <nav className={styles.Nav}>
            <div className={styles.Contact}>
                <span className="material-symbols-outlined">
                    phone
                </span>
                <Link
                    to='#'
                    onClick={(e) => {
                        window.location.href = "tel:+3900000000000";
                        e.preventDefault();
                    }}
                >
                    +39 000 0000 0000
                </Link>
                <span className="material-symbols-outlined">
                    email
                </span>
                <Link
                    to='#'
                    onClick={(e) => {
                        window.location.href = "mailto:elisa.forev@gmail.com";
                        e.preventDefault();
                    }}
                >
                    mg.studioestetico@gmail.com
                </Link>
            </div>
            <div>
                <Logo />
                <div className={styles.LinksContainer}>
                    <div className={styles.Links}>
                        <Link to="/">Home</Link>
                        <Link to="/test">Test</Link>
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
                    <div className={styles.Social}>
                        <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} size='xl' />
                        </Link>
                        <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size='xl' />
                        </Link>
                    </div>
                </div>
            </div>

        </nav>
    )
}
