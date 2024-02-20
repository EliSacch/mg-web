// componenets
import Card from "./Card";
// style
import styles from './styles/Treatments.module.css'

export default function Treatments({ treatments }) {

    return (
        <div className={styles.TreatmentsContainer}>
            {
                treatments?.filter(treatment => treatment.isActive==true).map(treatment => (
                    <Card key={treatments.indexOf(treatment)}>
                        <div>
                        <h3>{treatment.name}</h3>
                        <p>{treatment.description}</p>
                        <p>€{treatment.price}</p>
                    </div>
                    </Card>
                )
                )
            }
        </div>
    )
}
