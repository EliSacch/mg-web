import { unixToTime } from '../utils/datetimeUtils';
// style
import styles from './styles/ScheduleTable.module.css';

export default function ScheduleTable({ schedule }) {

    const days = {
        mon: "Lunedì",
        tue: "Martedì",
        wed: "Mercoledì",
        thu: "Giovedì",
        fri: "Venerdì",
        sat: "Sabato",
        sun: "Domenica"
    }

    return (
        <table className={styles.SchedulesTable}>
            <tbody>
                {
    
                    Object.keys(schedule?.slots).map(day => (
                        <tr key={days[`${day}`]}>
                            <td>{days[`${day}`]}</td>
                            <td>{schedule.slots[`${day}`] === null ? "Chiuso" : (
                                schedule.slots[`${day}`].map(slot => <span key={`${day}-${slot}`}>{`${unixToTime(slot.open)} - ${unixToTime(slot.close)}`}</span>)
                            )}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}