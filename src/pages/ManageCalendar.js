import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useSetCurrentMessage, useSetCurrentMessageType } from '../context/MessageContext';
import { useSettings } from '../hooks/useDefaultSchedule';
// components
import Select from '../components/form/Select';
// styles
import styles from './styles/ManageCalendar.module.css';


export default function ManageCalendar(props) {
    const [formErrors, setFormErrors] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [options, setOptions] = useState([])

    const { user } = useAuthContext();
    const {settings, getSettings, setSettings} = useSettings();
    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();
    

    const getOptions = (schedules) => {
        let opts = []
        for (let i in schedules) {
            opts.push({ id: schedules[i].id, value: schedules[i].name, disabled: false })
        }
        return opts;
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
        setOptions(getOptions(props.schedules))
    }, [props.schedules])

    useEffect(() => {
        getSettings();
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
