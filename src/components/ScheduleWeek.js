//componenets
import ScheduleDay from './form/ScheduleDay';
// styles
import styles from './styles/ScheduleWeek.module.css';
import btnStyles from '../pages/styles/Buttons.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { unixToTime } from '../utils/datetimeUtils';

const days = {
    mon: "Lunedì",
    tue: "Martedì",
    wed: "Mercoledì",
    thu: "Giovedì",
    fri: "Venerdì",
    sat: "Sabato",
    sun: "Domenica"
}

function ScheduleWeek({ day, schedule, setSchedule, setFormErrors, hasError }) {

    const editSlot = day => {
        const form = document.getElementById(`slots-${day}`);
        form.style.display = form.style.display === 'block' ? "none" : "block";
    }

    const removeSlot = day => {
        setSchedule({
            ...schedule,
            slots: {
                ...schedule.slots,
                [day]: null
            }
        })
    }

    return (
        <div>
        <div className={styles.Day}>
            <h3>{days[`${day}`]}</h3>
            <span>
            {schedule.slots[`${day}`] == null ? "Chiusi" : (
                schedule.slots[`${day}`].map(slot => <span key={`time-${day}`}>{`${unixToTime(slot.open)} - ${unixToTime(slot.close)}`}</span>)
            )}
            </span>

            <button type='button' onClick={() => editSlot(day)} className={btnStyles.BtnIcon}>
                <FontAwesomeIcon icon={faEdit} size='xl' />
            </button>
            <button type='button' onClick={() => removeSlot(day)} className={btnStyles.BtnIcon}>
                <FontAwesomeIcon icon={faTrash} size='xl' />
            </button>
        </div>
        <div id={`slots-${day}`} className={styles.SlotsForm}>
        <ScheduleDay
                label=""
                day={day}
                formData={schedule}
                setFormData={setSchedule}
                setFormErrors={setFormErrors}
                hasError={hasError}
              />
        </div>
        </div>
    )
}

export default ScheduleWeek
