// context
import { useAuthContext } from '../context/useAuthContext';
// componenets
import ManageTreatments from './ManageTreatments';
import ManageRooms from './ManageRooms';
import ManageSchedules from './ManageSchedules';
// styles
import styles from './styles/AdminDashboard.module.css';


export default function AdminDashboard({
    handleOpen,
    handleClose,
    showModal,
    setModalChildren
}) {

    const { authIsReady, user } = useAuthContext();

    return (
        authIsReady && user && (
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
    )
}