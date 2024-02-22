// styles
import ManageTreatments from './ManageTreatments';
import styles from './styles/AdminDashboard.module.css';

export default function AdminDashboard({
    handleOpen,
    handleClose,
    setModalChildren
}) {

    return (
        <main className={styles.Dashboard}>
            <section className={styles.Section}>
                <h2>Dashboard</h2>

                <ManageTreatments 
                handleOpen={handleOpen}
                handleClose={handleClose}
                setModalChildren={setModalChildren}
                />

            </section>
        </main>
    )
}