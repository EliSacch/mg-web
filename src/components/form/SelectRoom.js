import { useEffect, useState } from "react";
import Select from "./Select";

function SelectRoom({options, formData, setFormData, hasError}) {

    const [selectRoomOptions, setSelectRoomOptions] = useState([]);

    const handleSelectRoom = e => {
        const roomName = e.target.value ? options.filter(room => room.id == e.target.value)[0].name : ""
        setFormData({
            ...formData,
            room: roomName,
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
            setSelectRoomOptions(opts);
        }
    }, [])

    return (
        <Select
            title="Stanza"
            name="room"
            options={selectRoomOptions}
            value={selectRoomOptions.filter(room => room.value == formData.room)[0]?.id}
            onChange={handleSelectRoom}
            hideEmptyOption={false}
            placeHolder={"-----"}
            errorMsg={"Seleziona una stanza"}
            errorDiv={hasError("room") ? "input-error" : "d-none"}
        />
    )
}

export default SelectRoom
