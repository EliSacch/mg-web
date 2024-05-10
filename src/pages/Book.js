// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
// context
import { useCurrentUser } from '../context/CurrentUserContext';
// components
import SelectTreatment from '../components/form/SelectTreatment';
import SelectDatetime from '../components/form/SelectDatetime';
// style
import formStyles from './styles/Forms.module.css';
import btnStyles from './styles/Buttons.module.css';


export default function Book() {

    const today = new Date().toISOString().split('T')[0]

    const { currentUser, jwtToken } = useCurrentUser();
    const setCurrentMessage = useSetCurrentMessage();
    const setCurrentMessageType = useSetCurrentMessageType();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
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
        user: currentUser
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

            //const path = is_new ? "create" : `${id}/edit`
            //const calendarId = "80a5e04e62217d368744c29fe7bdfa020b1dc449f5acdf2b483dc7921c13c01a@group.calendar.google.com"
            fetch(`${process.env.REACT_APP_BACKEND}/appointment/book`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        navigate("/");
                        setCurrentMessageType("success");
                        setCurrentMessage("Appuntamento prenotato con successo!");
                    }
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

    const handleChange = () => (e) => {
        let value = e.target.value;
        let name = e.target.name;

        setFormData({
            ...formData,
            [name]: value,
        })
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
        if (!currentUser) {
            navigate("/");
            return
        }
    }, [currentUser, navigate])


    return (
        <main>
            <section className={formStyles.FormContainer}>
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
                                        setCurrentStep={setCurrentStep}
                                        hasError={hasError}
                                    />
                                )
                            }

                            {currentStep > 0 && (
                                <SelectDatetime
                                    today={today}
                                    treatment={treatments.filter(t => t.id = formData.treatment)}
                                    formData={formData}
                                    setFormData={setFormData}
                                    currentStep={currentStep}
                                    setCurrentStep={setCurrentStep}
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
