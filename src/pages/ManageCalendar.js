import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSetCurrentMessage, useSetCurrentMessageType } from '../context/MessageContext';
// components
import Select from '../components/form/Select';
// styles
import styles from './styles/ManageCalendar.module.css';


export default function ManageCalendar(props) {

    const [fetchError, setFetchError] = useState(null);
    const [formErrors, setFormErrors] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [options, setOptions] = useState([])
    const [settings, setSettings] = useState({
        default_schedule_name: "",
    });

    const { user } = useAuthContext();
    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();

    function getOptions(schedules) {
        let opts = []
        for (let i in schedules) {
            opts.push({ id: schedules[i].id, value: schedules[i].name, disabled: false })
        }
        setOptions(opts);
    }

    const handleSelectDefaultCalendar = e => {
        e.preventDefault();

        let errors = [];
        let required = [
            { field: e.target.value, name: "default_calendar" },
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

        const value = options.filter(opt => opt.id === e.target.value)[0]?.value;

        try {
            const headers = new Headers();
            headers.append("Content-type", "application/json");
            headers.append("Authorization", "Bearer " + user.accessToken)

            let requestBody = {
                id: "default",
                default_schedule_id: e.target.value,
                default_schedule_name: value,
            }

            let requestOptions = {
                body: JSON.stringify(requestBody),
                method: "PATCH",
                headers: headers,
                credentials: "include",
            }

            fetch(`${process.env.REACT_APP_BACKEND}/admin/settings/default/edit`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.message);
                    } else {
                        setSettings({
                            ...settings,
                            default_schedule_name: value,
                        })
                        setCurrentMessageType("success");
                        setCurrentMessage("Orario predefinito aggiornato con successo!");
                    }
                })
                .catch(err => {
                    console.log(err)
                    setCurrentMessageType("error");
                    setCurrentMessage("Non è stato possibile aggiornare l'orario predefinito! Per favore riprova.");
                })
        } catch (err) {
            console.log("error submitting the form: ", err)
        }
    }


    useEffect(() => {
        getOptions(props.schedules)
    }, [props.schedules])

    useEffect(() => {
        setIsPending(true)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + user.accessToken)

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/admin/settings/default`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setSettings(data);
                setIsPending(false);
            }).catch(err => {
                setIsPending(false);
                setFetchError("C'è stato un errore a recuperare gli orari dal database.")
            })

    }, [])


    return (

        !isPending && (
            <section className={styles.Section}>
                <h2>Calendario</h2>
                {<Select
                    name="default_calendar"
                    title="Orario predefinito:"
                    options={options}
                    value={options.filter(opt => opt.value === settings.default_schedule_name)[0]?.id}
                    onChange={e => handleSelectDefaultCalendar(e)}
                    hideEmptyOpyion={true}
                />}
            </section>
        )
    )
}
