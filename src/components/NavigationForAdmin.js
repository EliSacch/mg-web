// hooks
import { useState } from 'react';
// contect
import { useCurrentUser } from '../context/CurrentUserContext';
// components
import Logo from './Logo';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
// style
import styles from './styles/Navigation.module.css';
import btnStyles from '../pages/styles/Buttons.module.css';



export default function NavigationForAdmin(props) {
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
        <nav className={styles.AdminNav}>
            <Logo />

            {/* large screen */}
            <div className="d-none d-md-block">
                <div className={styles.LinksContainer}>
                    <div className={styles.Links}>
                        <Link to="/">Home</Link>
                        <Link to="/">Gestisci Trattamenti</Link>
                        <button onClick={openLogoutModal}>Logout</button>
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
                                <Link to="/">Gestisci Trattamenti</Link>
                                <button onClick={openLogoutModal}>Logout</button>
                            </div>

                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </div>

        </nav>
    )
}
