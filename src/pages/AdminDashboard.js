// styles
import ManageTreatments from './ManageTreatments';
import styles from './styles/AdminDashboard.module.css';

export default function AdminDashboard({
    handleOpen,
    handleClose,
    showModal,
    setModalChildren
}) {

    return (
        <main className={styles.Dashboard}>
            <section className={styles.Section}>
                <h2>Dashboard</h2>

                <ManageTreatments 
                handleOpen={handleOpen}
                handleClose={handleClose}
                showModal={showModal}
                setModalChildren={setModalChildren}
                />

            </section>
        </main>
    )
}