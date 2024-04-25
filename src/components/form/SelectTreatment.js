import { useEffect, useState } from "react";
import Select from "./Select";

function SelectTreatment({options, formData, setFormData, setCurrentStep, hasError}) {

    const [selectTreatmentOptions, setSelectTreatmentOptions] = useState([]);

    const handleSelectTreatment = e => {
        console.log("target", e.target.value)
        setFormData({
            ...formData,
            treatment: e.target.value,
        })

        if(e.target.value == "") {
            setCurrentStep(0)
        } else if (formData.date == null) {
            setCurrentStep(1)
        } else {
            setCurrentStep(2)
        }

        console.log(formData)
    }

    useEffect(() => {
        if (options.length > 0) {
            let opts = []

            options.forEach(op => {
                opts.push({ 
                    id: op.id,
                    value: op.name,
                    disabled: false
                })
            });
            setSelectTreatmentOptions(opts);
        }
    }, [])

    return (
        <Select
            title="Trattamento"
            name="treatment"
            options={selectTreatmentOptions}
            onChange={handleSelectTreatment}
            placeHolder={"Seleziona un trattamento"}
            errorMsg={"Seleziona un trattamento"}
            errorDiv={hasError("treatment") ? "input-error" : "d-none"}
        />
    )
}

export default SelectTreatment
