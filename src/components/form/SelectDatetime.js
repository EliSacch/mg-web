// hooks
import { useEffect, useState } from "react";
// components
import Select from "./Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { it } from "date-fns/locale";
// style
import "react-datepicker/dist/react-datepicker.css";
import formStyle from "../../pages/styles/Forms.module.css"
import styles from './Form.module.css';


registerLocale("it", it);

function SelectDatetime({ today, treatment, formData, setFormData, currentStep, setCurrentStep, hasError }) {

    const handleSelectDate = data => {
        setFormData({
            ...formData,
            date: data,
        });

        console.log(data)
        setCurrentStep(data != null ? 2 : 1);

        console.log(formData)
    }

    const handleSelectTime = e => {
        setFormData({
            ...formData,
            time: e.target.value,
        });

        console.log(formData)
    }

    const options = [
        { id: 800, value: "08:00", disabled: false },
        { id: 900, value: "09:00", disabled: true },
        { id: 1000, value: "10:00", disabled: false },
        { id: 1100, value: "11:00", disabled: false }
    ]

    useEffect(() => {
        setCurrentStep(formData.date != null && formData.date != "" ? 2 : 1);
    }, [formData.date])

    return (
        <div className={formStyle.FormLine}>
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
                    />
                </span>

            </div>

            {
                currentStep > 1 && (
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
