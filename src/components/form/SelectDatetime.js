// hooks
import { useEffect, useState } from "react";
// utils
import { formatIntToHour } from '../../utils/datetimeUtils.js';
// components
import Select from "./Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { it } from "date-fns/locale";
// style
import "react-datepicker/dist/react-datepicker.css";
import formStyles from "../../pages/styles/Forms.module.css"
import styles from './Form.module.css';


registerLocale("it", it);

function SelectDatetime({ today, formData, setFormData, currentStep, setCurrentStep }) {

    const [options, setOptions] = useState([])
    const [isPending, setIsPending] = useState(true)

    function getOptions(slots) {

        let opts = []
        for (let i in slots) {
            opts.push({ id: slots[i], value: formatIntToHour(slots[i]), disabled: false })
        }
        setOptions(opts);
    }

    const fetchAvailability = async (treatment, date) => {
        setIsPending(true);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestOptions = {
            body: JSON.stringify({ treatment: treatment, date: date }),
            method: "PUT",
            headers: headers,
            credentials: "include",
        }

        await fetch(`${process.env.REACT_APP_BACKEND}/calendar/availability`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.time_slots.length > 0) {
                    getOptions(data.time_slots)
                }

            }).catch(err => {
                console.log(err);
            })

        setCurrentStep(date != null ? 2 : 1);
        setIsPending(false);
    }

    const handleSelectDate = data => {
        setFormData({
            ...formData,
            date: data,
            time: "",
        });
        fetchAvailability(formData.treatment, data)
    }

    const handleSelectTime = e => {
        setFormData({
            ...formData,
            time: e.target.value,
        });
    }

    useEffect(() => {
        setCurrentStep(formData.date != null && formData.date != "" ? 2 : 1);
    }, [formData.date])

    useEffect(() => {
        fetchAvailability(formData.treatment, formData.date)
    }, [formData.treatment])

    return (
        <div className={formStyles.FormLine}>
            <div className={styles.InputContainer}>
                <label htmlFor="date" className={styles.Label}>
                    Data
                </label>
                <span>
                    <FontAwesomeIcon icon={faCalendar} size="xl" />
                    <ReactDatePicker
                        name="date"
                        locale="it"
                        selected={formData.date}
                        onChange={data => handleSelectDate(data)}
                        minDate={today}
                        maxDate={new Date().setMonth(new Date().getMonth() + 6)}
                        className={styles.DatePicker}
                        dateFormat="dd/MM/YYYY"
                    />
                </span>
            </div>
            {
                !isPending && currentStep > 1 && (
                    <Select
                        name="time"
                        title="Ora"
                        options={options}
                        value={formData.time}
                        onChange={handleSelectTime}
                    />
                )
            }
        </div>
    )
}

export default SelectDatetime
