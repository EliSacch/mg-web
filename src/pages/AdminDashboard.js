// componenets
import { Link } from 'react-router-dom';
import ManageTreatments from './ManageTreatments';
import ManageRooms from './ManageRooms';
// styles
import styles from './styles/AdminDashboard.module.css';
import btnStyles from './styles/Buttons.module.css';
import ManageSchedules from './ManageSchedules';


export default function AdminDashboard({
    handleOpen,
    handleClose,
    showModal,
    setModalChildren
}) {

    return (
        <main className={styles.Dashboard}>

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

            <ManageSchedules
                handleOpen={handleOpen}
                handleClose={handleClose}
                showModal={showModal}
                setModalChildren={setModalChildren}
            />
        </main>
    )
}