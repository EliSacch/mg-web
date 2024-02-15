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
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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

    useEffect(() => {
        setHasLoaded(true)
    }, [])

    return (
        hasLoaded && (
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

                    {/* small screen */}
                    <div className="d-md-none">
                        <div className={styles.HamburgerContainer}>
                            <button onClick={handleShowMenu} className={styles.Hamburger}>
                                <FontAwesomeIcon icon={faBars} size='xl' />
                            </button>

                            <Offcanvas show={showMenu} onHide={handleCloseMenu} className='d-md-none'>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title className={styles.OffcanvasTitle}>MG Studio Estetico</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <div className={styles.LinksOffcanvas}>
                                        <Link to="/">Home</Link>
                                        <Link to="/test">Test</Link>
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
                                    </div>

                                </Offcanvas.Body>
                            </Offcanvas>
                        </div>
                    </div>
                </div>

            </nav>
        )
    )
}
