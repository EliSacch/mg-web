// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
// context
import { useAuthContext } from '../hooks/useAuthContext';
// components
import SelectTreatment from '../components/form/SelectTreatment';
import SelectDatetime from '../components/form/SelectDatetime';
import GoBackButton from '../components/GoBackButton';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function Book() {

    const { authIsReady, user } = useAuthContext();

    const today = new Date().toISOString().split('T')[0]

    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();
    const navigate = useNavigate();

    const [isPending, setIsPending] = useState(false);
    const [treatments, setTreatments] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const hasError = key => {
        return formErrors.indexOf(key) !== -1;
    }
    const [formData, setFormData] = useState({
        treatment: "",
        date: today,
        time: "",
        user: user
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        // if there are no errors, then submit
        try {
            const headers = new Headers();
            headers.append("Content-type", "application/json");

            let requestOptions = {
                body: JSON.stringify(formData),
                method: "PUT",
                headers: headers,
                credentials: "include",
            }

            fetch(`${process.env.REACT_APP_BACKEND}/appointment/book`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    navigate("/");
                    setCurrentMessageType("success");
                    setCurrentMessage("Appuntamento prenotato con successo!");
                })
                .catch(err => {
                    console.log(err)
                    setCurrentMessageType("error");
                    setCurrentMessage("Non è stato possibile eseguire la richiesta! Per favore riprova.");
                })
        } catch (err) {
            console.log("error submitting the form: ", err)
        }
    }

    useEffect(() => {
        setIsPending(true)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        fetch(`${process.env.REACT_APP_BACKEND}/treatments`, requestOptions)
            .then(res => res.json())
            .then(data => data.filter(d => d.is_active == true))
            .then(data => {
                setTreatments(data);
                setIsPending(false);
            }).catch(err => {
                console.log(err);
                setIsPending(false);
            })

    }, [])

    useEffect(() => {
        if (!user) {
            navigate("/");
            return
        }
    }, [user, navigate])


    return (
        <main>
            <section className={formStyles.FormContainer}>
                <GoBackButton />
                <h2>Prenota</h2>
                {isPending && <p>Loading...</p>}
                {
                    !isPending && (
                        <form onSubmit={handleSubmit} className={formStyles.Form}>

                            {
                                treatments.length > 0 && (
                                    <SelectTreatment
                                        options={treatments}
                                        formData={formData}
                                        setFormData={setFormData}
                                        hasError={hasError}
                                    />
                                )
                            }

                            {formData.treatment && (
                                <SelectDatetime
                                    today={today}
                                    treatment={treatments.filter(t => t.id = formData.treatment)}
                                    formData={formData}
                                    setFormData={setFormData}
                                    hasError={hasError}
                                />

                            )}

                            {formData.treatment != "" && formData.date != null && formData.time != "" && (
                                <button id="book" className={btnStyles.Btn}>Conferma</button>
                            )}

                        </form>
                    )
                }
            </section>
        </main>
    )
}
