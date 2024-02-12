// hooks
import { useState, useEffect } from 'react';
// contect
import { useCurrentUser } from '../context/CurrentUserContext';
// components
import Logo from './Logo';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// style
import styles from './styles/Navigation.module.css';
import btnStyles from '../pages/styles/Buttons.module.css';


export default function Navigation(props) {
    const [showMenu, setShowMenu] = useState(false);
    const currentUser = useCurrentUser();

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

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

                <Link
                    to='#'
                    onClick={(e) => {
                        window.location.href = "tel:+3900000000000";
                        e.preventDefault();
                    }}
                >
                    <span className="material-symbols-outlined">
                        phone
                    </span>
                    <span className='d-none d-md-block'>
                        +39 000 0000 0000
                    </span>
                </Link>

                <Link
                    to='#'
                    onClick={(e) => {
                        window.location.href = "mailto:elisa.forev@gmail.com";
                        e.preventDefault();
                    }}
                >
                    <span className="material-symbols-outlined">
                        email
                    </span>
                    <span className='d-none d-md-block'>
                        mg.studioestetico@gmail.com
                    </span>

                </Link>

                <div className='d-md-none'>
                    <div className={styles.Social}>
                        <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} size='lg' />
                        </Link>
                        <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size='lg' />
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <Logo />

                {/* large screen */}
                <div className="d-none d-md-block">

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
                                        <>
                                            { currentUser?.is_admin && <Link to="/admin">Admin</Link>}
                                            <button onClick={openLogoutModal}>Logout</button>
                                        </>
                                        
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

                {/* small screen */}
                <div className="d-md-none">
                    <div className={styles.HamburgerContainer}>
                        <button onClick={handleShowMenu} className={styles.Hamburger}>
                            <FontAwesomeIcon icon={faBars} size='xl' />
                        </button>

                        <Offcanvas show={showMenu} onHide={handleCloseMenu}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className={styles.OffcanvasTitle}>MG Studio Estetico</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className={styles.LinksOffcanvas}>
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

                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </div>

        </nav>
    )
}
