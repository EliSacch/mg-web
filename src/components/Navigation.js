// hooks
import { useState, useEffect } from 'react';
// contect
import { useCurrentUser } from '../context/CurrentUserContext';
// components
import Logout from '../pages/Logout';
import Logo from './Logo';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// style
import styles from './styles/Navigation.module.css';



export default function Navigation(props) {

    const [hasLoaded, setHasLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const currentUser = useCurrentUser();

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    const openLogoutModal = () => {
        props.setModalChildren(
            <Logout handleClose={() => props.handleClose()} />
        )
        props.handleOpen()
    }

    const openModalFromOffcanvas = () => {
        openLogoutModal();
        handleCloseMenu();
    }

    const LINKS = (
        <>
            <Link to="/">Home</Link>
            <Link to="/test">Test</Link>

            <span className={styles.MoveRight}>
            {!currentUser && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign up</Link>
                </>
            )
            }
            {currentUser?.is_admin && <Link to="/admin">Admin</Link>}
            {
                currentUser && (
                    <button onClick={openModalFromOffcanvas}>Logout</button>
                )
            }
            </span>
        </>
    )

    const SOCIALS = (
        <div className={styles.Social}>
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size='xl' />
            </Link>
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size='xl' />
            </Link>
        </div>
    )

    useEffect(() => {
        setHasLoaded(true)
    }, [])

    return (
        hasLoaded && (
            <nav className={styles.Nav}>
                <div className={`${styles.Contact} d-none d-md-block`}>

                    <div>
                        <Link
                            to='#'
                            onClick={(e) => {
                                window.location.href = "tel:+3900000000000";
                                e.preventDefault();
                            }}
                        >
                            <FontAwesomeIcon icon={faPhone} size='lg' />
                            <span>
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
                            <FontAwesomeIcon icon={faEnvelope} size='lg' />
                            <span>
                                mg.studioestetico@gmail.com
                            </span>
                            {SOCIALS}
                        </Link>
                    </div>

                </div>

                <Logo />

                {/* large screen */}
                <div className="d-none d-md-block">
                    <div className={styles.LinksContainer}>
                        <div className={styles.Links}>
                            {LINKS}
                        </div>
                    </div>
                </div>

                {/* small screen */}
                <div className="d-md-none">
                    <div className={styles.HamburgerContainer}>
                        <button onClick={handleShowMenu} className={styles.Hamburger}>
                            <FontAwesomeIcon icon={faBars} size='xl' />
                        </button>

                        <Offcanvas show={showMenu} onHide={handleCloseMenu} className={styles.Offcanvas}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>MG Studio Estetico</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className={styles.LinksOffcanvas}>
                                    {SOCIALS}
                                    {LINKS}
                                </div>

                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>


            </nav>
        )
    )
}
