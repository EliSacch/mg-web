// hooks
import { useEffect, useState } from "react";
// componenets
import Input from "./Input.js";
import "react-datepicker/dist/react-datepicker.css";
// style
import formStyles from "../../pages/styles/Forms.module.css"
import styles from './Form.module.css';



function ScheduleDay({ label, day, formData, setFormData, setFormErrors, hasError }) {

    const [isPending, setIsPending] = useState(true)

    const isValidTime = (open, close) => {
        return open < close
    }

    const handleSelectStartTime = (event, i) => {
        const newDay = formData.slots[day] !== null ? (
            formData.slots[day]
        ) : []

        newDay[i] = {
            open: event.target.value,
            close: formData.slots[day] ? formData.slots[day][i]?.close : "",
        }

        setFormData({
            ...formData,
            slots: {
                ...formData.slots,
                [day]: newDay
            }
        })
    }

    const handleSelectEndTime = (event, i) => {
        const close = event.target.value
        const newDay = formData.slots[day] !== null ? (
            formData.slots[day]
        ) : []

        newDay[i] = {
            open: formData.slots[day] ? formData.slots[day][i]?.open : "",
            close: close,
        }

        const isValid = isValidTime(newDay[i].open, close)
        
        if (isValid) {
            setFormData({
                ...formData,
                slots: {
                    ...formData.slots,
                    [day]: newDay
                }
            })
        } else {
            setFormErrors(`end${i}`)
        }
    }

    useEffect(() => {
        setIsPending(true)
        return setIsPending(false)
        }
    )

    return !isPending && (
        <div className={formStyles.FormLine}>
            <div className={styles.InputContainer}>
                <label htmlFor="date" className={styles.Label}>
                    {label}
                </label>
                {<span className={formStyles.FormLine}>
                    <Input
                        id="start1"
                        title="Apertura"
                        type="time"
                        name="start1"
                        onChange={e => handleSelectStartTime(e, 0)}
                        value={formData.slots[day] !== null && formData.slots[day].length > 0 ? (
                            formData.slots[day][0].open
                        ) : ""}
                        errorDiv={hasError("start1") ? "input-error" : "d-none"}
                        errorMsg="Valore invalido"
                    />
                    <Input
                        id="end1"
                        title="Chiusura"
                        type="time"
                        name="end1"
                        onChange={e => handleSelectEndTime(e, 0)}
                        value={formData.slots[day] !== null && formData.slots[day].length > 0 ? (
                            formData.slots[day][0].close
                        ) : ""}
                        errorDiv={hasError("end1") ? "input-error" : "d-none"}
                        errorMsg="Valore invalido"
                    />
                </span>}
            </div>
        </div>
    )
}

export default ScheduleDay
