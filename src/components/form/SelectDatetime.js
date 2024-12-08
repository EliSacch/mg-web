// hooks
import { useEffect, useState } from "react";
// utils
import { unixToTime } from '../../utils/datetimeUtils.js';
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
import { Alert, Spinner } from "react-bootstrap";


registerLocale("it", it);

function SelectDatetime({ today, formData, setFormData }) {

    const [options, setOptions] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [excludeDates, setExcludeDates] = useState([])

    function getOptions(slots) {
        let opts = []
        for (let i in slots) {
            opts.push({ id: slots[i], value: unixToTime(slots[i]), disabled: false })
        }
        setOptions(opts);
    }

    const getDaysAvailability = async date => {
        setIsPending(true);
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            let requestOptions = {
                method: "GET",
                headers: headers,
                credentials: "include"
            }

            const res = await fetch(`${process.env.REACT_APP_BACKEND}/calendar/availability/${date.getFullYear()}/${date.getMonth()}`, requestOptions)
                .then(res => res.json())
                .catch(err => {
                    console.log(err)
                })

            setExcludeDates(res?.data)

        } catch (error) {
            console.log(error);
        } finally {
            setIsPending(false);
        }

    }

    const getTimeAvailability = async (treatment, date) => {
        setIsPending(true);
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            let requestOptions = {
                body: JSON.stringify({ treatment: treatment, date: date }),
                method: "PUT",
                headers: headers,
                credentials: "include",
            }

            const res = await fetch(`${process.env.REACT_APP_BACKEND}/calendar/availability`, requestOptions)
                .then(res => res.json())
                .catch(err => {
                    console.log(err)
                })

            getOptions(res.data?.time_slots)

        } catch (error) {
            console.log(error);
        } finally {
            setIsPending(false);
        }
    }

    const handleSelectDate = data => {
        setFormData({
            ...formData,
            date: data,
            time: "",
        });
        getTimeAvailability(formData.treatment, data)
    }

    const handleSelectTime = e => {
        setFormData({
            ...formData,
            time: e.target.value,
        });
    }

    useEffect(() => {
        getTimeAvailability(formData.treatment, new Date(formData.date))
    }, [formData.treatment])

    useEffect(() => {
        const today = new Date;
        setFormData({
            ...formData,
            date: today,
        });
    }, [])

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
                        dateFormat="dd/MM/yyyy"
                        onMonthChange={data => getDaysAvailability(data)}
                        excludeDates={excludeDates}
                        onCalendarOpen={() => getDaysAvailability(formData.date)}
                    />
                </span>
            </div>
            {
                !isPending && formData.treatment && formData.date && options.length > 0 && (
                    <Select
                        name="time"
                        title="Ora"
                        placeHolder="-:--"
                        hideEmptyOptions={false}
                        options={options}
                        value={formData.time}
                        onChange={handleSelectTime}
                    />
                )
            }
            {!isPending && options.length < 1 && (
                <Alert variant="warning">Non ci sono orari disponibili</Alert>
            )}

            {isPending && <Spinner animation="border" size="sm" />}

        </div>
    )
}

export default SelectDatetime
