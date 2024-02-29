import { useEffect, useState } from "react";
import Select from "./Select";

function SelectTreatment({options, formData, setFormData, setCurrentStep, hasError}) {

    const [selectTreatmentOptions, setSelectTreatmentOptions] = useState([]);

    const handleSelectTreatment = e => {
        setFormData({
            ...formData,
            treatment: e.target.value,
        })

        if(e.target.value != "") {
            setCurrentStep(1)
        } else {
            setCurrentStep(0)
        }
    }

    useEffect(() => {
        if (options.length > 0) {
            let opts = []
            options.forEach(treatment => {
                opts.push({ 
                    id: treatment.id,
                    value: treatment.name,
                    disabled: false})
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
