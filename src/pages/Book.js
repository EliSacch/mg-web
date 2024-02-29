// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetCurrentMessage, useSetCurrentMessageType } from "../context/MessageContext";
// context
import { useCurrentUser } from '../context/CurrentUserContext';
// components
import SelectTreatment from '../components/form/SelectTreatment';
import Input from '../components/form/Input';
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
    const [hasLoaded, setHasLoaded] = useState(false);
    const [treatments, setTreatments] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const hasError = key => {
        return formErrors.indexOf(key) !== -1;
    }
    const [formData, setFormData] = useState({
        treatment: "",
        date: today,
        time: "",
        user: currentUser?.id
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
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
        setHasLoaded(false);
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: headers,
            }

            fetch(`${process.env.REACT_APP_BACKEND}/treatments`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    setTreatments(data);
                })
                .catch(err => {
                    console.log(err)
                })

        } catch (err) {
            console.log(err)
        } finally {
            setHasLoaded(true);
        }

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
                {
                    hasLoaded && (
                        <form onSubmit={handleSubmit} className={formStyles.Form}>

                            {
                                treatments.length > 0 && (
                                    <SelectTreatment
                                        options={treatments.filter(treatment => treatment.is_active)}
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
                                setCurrentStep={setCurrentStep}
                                hasError={hasError}
                                />
                                
                            )}

                            {/*<button id="book" className={btnStyles.Btn}>Conferma</button>*/}

                        </form>
                    )
                }
            </section>
        </main>
    )
}
