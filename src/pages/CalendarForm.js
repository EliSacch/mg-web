// hooks
import { useEffect, useState } from "react";
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
// components
import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { it } from "date-fns/locale";
import GoBackButton from "../components/GoBackButton";
import Select from "../components/form/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

registerLocale("it", it);

const CalendarForm = ({ is_new }) => {
    const [calendar, setCalendar] = useState({
        schedule_id: "",
        start_date: "",
        end_date: ""
    })
    const [options, setOptions] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [formErrors, setFormErrors] = useState([]);
    const hasError = key => {
        return formErrors.indexOf(key) !== -1;
    }

    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();

    const { user } = useAuthContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0]

    const handleSelectSchedule = e => {
        const schedulesArray = options.filter(opt => opt.id == e.target.value)
        setCalendar({
            ...calendar,
            schedule_id: schedulesArray.length > 0 ? schedulesArray[0].id : '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = [];
        let required = [
            { field: calendar.schedule, name: "schedule" },
            { field: calendar.start_date, name: "start_date" },
            { field: calendar.end_date, name: "end_date" },
        ]
        required.forEach(obj => {
            if (obj.field == "") {
                errors.push(obj.name);
            }
        })
        setFormErrors(errors);
        if (errors.length > 0) {
            return false
        }

        try {
            const headers = new Headers();
            headers.append("Content-type", "application/json");
            headers.append("Authorization", "Bearer " + user.accessToken)

            let requestBody = calendar;

            let requestOptions = {
                body: JSON.stringify(requestBody),
                method: is_new ? "PUT" : "PATCH",
                headers: headers,
                credentials: "include",
            }

            console.log(requestBody)

            const path = is_new ? "create" : `${id}/edit`
            fetch(`${process.env.REACT_APP_BACKEND}/admin/calendars/${path}`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data);
                        setCurrentMessageType("error");
                        setCurrentMessage("Non è stato possibile " + (is_new ? "creare" : "aggiornare") + " il calendario! Per favore riprova.");
                    } else {
                        navigate("/admin");
                        setCurrentMessageType("success");
                        setCurrentMessage("Calendario " + (is_new ? "creato" : "aggiornato") + " con successo!");
                    }
                })
                .catch(err => {
                    console.log(err)
                    setCurrentMessageType("error");
                    setCurrentMessage("Non è stato possibile " + (is_new ? "creare" : "aggiornare") + " il calendario! Per favore riprova.");
                })
        } catch (err) {
            console.log("error submitting the form: ", err)
        }
    }

    const fetchSchedules = async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + user.accessToken)

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/admin/schedules`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setOptions(data.map(d => ({
                    id: d.id,
                    value: d.name,
                    disabled: false
                })));
            })
            .catch(err => {
                setFetchError("C'è stato un errore a recuperare gli orari dal database.")
            })
    }

    const getOptions = async () => {
        await fetchSchedules();
        setIsPending(false);
    }

    useEffect(() => {
        setIsPending(true);
        getOptions();
    }, [])

    return (
        <main>
            {isPending && <p>Loading...</p>}
            {!isPending && (
                <section className={formStyles.FormContainer}>
                    <GoBackButton />
                    <h2>{is_new ? "Aggiungi Calendario" : "Modifica Calendario"}</h2>

                    {fetchError != null ? (
                        <p>{fetchError}</p>
                    ) : (
                        <form onSubmit={handleSubmit} className={formStyles.Form}>

                            <Select
                                title="Orario"
                                name="schedule"
                                options={options}
                                onChange={handleSelectSchedule}
                                hideEmptyOptions={false}
                                placeHolder="Test"
                                errorMsg={"Seleziona un orario"}
                                errorDiv={hasError("schedule") ? "input-error" : "d-none"}
                            />

                            <div className={formStyles.FormLine}>
                                <div className={formStyles.InputContainer}>
                                    <label htmlFor="start_date" className={formStyles.Label}>
                                        <FontAwesomeIcon icon={faCalendar} size="lg" /> Inizio
                                    </label>
                                    <ReactDatePicker
                                        name="start_date"
                                        locale="it"
                                        selected={calendar.start_date}
                                        onChange={data => setCalendar({ ...calendar, start_date: data })}
                                        minDate={today}
                                        maxDate={new Date().setMonth(new Date().getMonth() + 12)}
                                        className={formStyles.DatePicker}
                                        dateFormat="dd/MM/YYYY"
                                    />
                                    <span className={hasError("start_date") ? "input-error" : "d-none"}>
                                        Seleziona una data di inizio.
                                    </span>
                                </div>
                                <div className={formStyles.InputContainer}>
                                    <label htmlFor="end_date" className={formStyles.Label}>
                                        <FontAwesomeIcon icon={faCalendar} size="lg" /> Fine
                                    </label>
                                    <ReactDatePicker
                                        name="end_date"
                                        locale="it"
                                        selected={calendar.end_date}
                                        onChange={data => setCalendar({ ...calendar, end_date: data })}
                                        minDate={today}
                                        maxDate={new Date().setMonth(new Date().getMonth() + 12)}
                                        className={formStyles.DatePicker}
                                        dateFormat="dd/MM/YYYY"
                                    />
                                    <span className={hasError("end_date") ? "input-error" : "d-none"}>
                                        Seleziona una data di fine.
                                    </span>
                                </div>
                            </div>
                            <button className={btnStyles.Btn}>Salva</button>
                        </form>
                    )
                    }
                </section>
            )}

        </main>
    )
}

export default CalendarForm