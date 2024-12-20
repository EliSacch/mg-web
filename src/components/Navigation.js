// hooks
import { useEffect, useState } from 'react';
// context
import { useAuthContext } from '../hooks/useAuthContext';
// components
import Logout from '../pages/Logout';
import Logo from './Logo';
import { Offcanvas } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// style
import styles from './styles/Navigation.module.css';


export default function Navigation(props) {

    const { user } = useAuthContext();

    const [showMenu, setShowMenu] = useState(false);

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

    useEffect(() => {
        handleCloseMenu();
    }, [])

    const LINKS = (
        <>
            <NavLink to="/">Home</NavLink>
            {user && <NavLink to="/book">Prenota</NavLink>}

            <span className={styles.MoveRight}>
                {!user && (
                    <>
                        <NavLink to="/login">Accedi</NavLink>
                        <NavLink to="/signup">Registrati</NavLink>
                    </>
                )}
                { user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
                {
                    user && (
                        <button onClick={openModalFromOffcanvas}>Logout</button>
                    )

                }
            </span>
        </>
    )

    const CONTACT = (
        <div className={styles.Contact}>
            <Link
                to='#'
                onClick={(e) => {
                    window.location.href = "tel:+3900000000000";
                    e.preventDefault();
                }}
            >
                <FontAwesomeIcon icon={faPhone} size='xl' />
                <span className="d-none d-md-block">
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
                <FontAwesomeIcon icon={faEnvelope} size='xl' />
                <span className="d-none d-md-block">
                    mg.studioestetico@gmail.com
                </span>
            </Link>
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size='xl' />
            </Link>
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size='xl' />
            </Link>
        </div>
    )

    const CONTACT_OFFCANVAS = (
        <div className={styles.Contact}>
            <Link
                to='#'
                onClick={(e) => {
                    window.location.href = "tel:+3900000000000";
                    e.preventDefault();
                }}
            >
                <FontAwesomeIcon icon={faPhone} size='xl' />
            </Link>

            <Link
                to='#'
                onClick={(e) => {
                    window.location.href = "mailto:elisa.forev@gmail.com";
                    e.preventDefault();
                }}
            >
                <FontAwesomeIcon icon={faEnvelope} size='xl' />
            </Link>
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size='xl' />
            </Link>
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size='xl' />
            </Link>
        </div>
    )

    return (
        <nav className={styles.Nav}>
            <div className={`${styles.ContactContainer} d-none d-md-block`}>
                {CONTACT}
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
                            <Offcanvas.Title>MG Studio Estetico!</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className={styles.LinksOffcanvas}>
                                {LINKS}
                                {CONTACT_OFFCANVAS}
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>

                </div>
            </div>
        </nav>
    )
}
