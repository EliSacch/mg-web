export default function Treatments({ treatments }) {

    return (
        <>
            {
                treatments.map(treatment => (
                    <div key={treatments.indexOf(treatment)}>
                        <h3>{treatment.name}</h3>
                        <p>{treatment.description}</p>
                        <p>€{treatment.price}</p>
                        <p>{treatment.duration} min</p>
                        <p>{treatment.image}</p>
                        <p>{treatment.isActive}</p>
                        <p>{treatment.createdAt}</p>
                    </div>
                )
                )
            }
        </>
    )
}
