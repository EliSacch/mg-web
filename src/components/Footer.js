// components
import { Link } from 'react-router-dom';
import Logo from './Logo';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// styles
import styles from './styles/Footer.module.css';


export default function Footer() {

    return (
        <div className={styles.Footer}>
            <Logo />

            <div className={styles.Social}>
                <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} size='xl' />
                </Link>
                <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} size='xl' />
                </Link>
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
            </div>

            <table>
                <thead>
                    <th>Orario di apertura</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr>
                        <td>Lunedí</td>
                        <td>Chiusi</td>
                    </tr>
                    <tr>
                        <td>Martedí</td>
                        <td>9:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>Mercoledí</td>
                        <td>9:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>Giovedí</td>
                        <td>9:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>Venerdí</td>
                        <td>9:00 - 16:00</td>
                    </tr>
                    <tr>
                        <td>Sabato</td>
                        <td>9:00 - 12:00</td>
                    </tr>
                    <tr>
                        <td>Domeica</td>
                        <td>Chiusi</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
