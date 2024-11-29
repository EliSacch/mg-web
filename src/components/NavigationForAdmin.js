// hooks
import { useState } from 'react';
// components
import Logout from '../pages/Logout';
import Logo from './Logo';
import { Offcanvas } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
// style
import styles from './styles/Navigation.module.css';


export default function NavigationForAdmin(props) {
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

    const LINKS = (
        <>
            <NavLink to="/admin">Dashboard</NavLink>
            
            <span className={styles.MoveRight}>
                <NavLink exact to="/">Home</NavLink>
                <button onClick={openModalFromOffcanvas}>Logout</button>
            </span>
        </>
    )

    return (
        <nav className={styles.Nav}>

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
                                {LINKS}
                            </div>

                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </div>

        </nav>
    )
}
