// hooks

// components
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSvg } from '../logo.svg';
// style
import styles from './styles/Navigation.module.css';

export default function Navigation({ handleOpen }) {

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <LogoSvg />
                <Link to="/"><h1>MG</h1></Link>
            </div>
            <div className={styles.links}>

                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>

                <p>Hi there!</p>
                <button onClick={handleOpen}>Logout</button>


            </div>
        </nav>
    )
}
