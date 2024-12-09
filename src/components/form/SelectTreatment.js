import { useEffect, useState } from "react";
import Select from "./Select";

function SelectTreatment({options, formData, setFormData, hasError}) {

    const [selectTreatmentOptions, setSelectTreatmentOptions] = useState([]);

    const handleSelectTreatment = e => {
        setFormData({
            ...formData,
            treatment: e.target.value,
            time: "",
        })
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
            value={formData.treatment}
            onChange={handleSelectTreatment}
            placeHolder="---"
            hideEmptyOption={false}
            errorMsg={"Seleziona un trattamento"}
            errorDiv={hasError("treatment") ? "input-error" : "d-none"}
        />
    )
}

export default SelectTreatment
