// hooks
import { useEffect, useState } from "react";
// components
import Select from "./Select";
import Input from "./Input";
import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { it } from "date-fns/locale";
// style
import "react-datepicker/dist/react-datepicker.css";
import formStyle from "../../pages/styles/Forms.module.css"
import styles from './Form.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

registerLocale("it", it);

function SelectDatetime({ today, treatment, formData, setFormData, setCurrentStep, hasError }) {

    const handleSelectDate = date => {
        setFormData({
            ...formData,
            date: date,
        })

        if (date != "") {
            setCurrentStep(2)
        } else {
            setCurrentStep(1)
        }
    }

    const options = [{ id: 1, value: "test" }]

    return (
        <div className={formStyle.FormLine}>
            <FontAwesomeIcon icon={faCalendar} size="xl" />
            <ReactDatePicker
                locale="it"
                selected={formData.date}
                onChange={date => handleSelectDate(date)}
                minDate={today}
                maxDate={new Date().setMonth(new Date().getMonth() + 6)}
                className={styles.DatePicker}
            />

        </div>

    )
}

export default SelectDatetime
