// componenets
import { Link } from 'react-router-dom';
import ManageTreatments from './ManageTreatments';
import ManageRooms from './ManageRooms';
// styles
import styles from './styles/AdminDashboard.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function AdminDashboard({
    handleOpen,
    handleClose,
    showModal,
    setModalChildren
}) {

    return (
        <main className={styles.Dashboard}>

            <h2>Dashboard</h2>

            <ManageTreatments
                handleOpen={handleOpen}
                handleClose={handleClose}
                showModal={showModal}
                setModalChildren={setModalChildren}
            />

            <ManageRooms
                handleOpen={handleOpen}
                handleClose={handleClose}
                showModal={showModal}
                setModalChildren={setModalChildren}
            />
        </main>
    )
}