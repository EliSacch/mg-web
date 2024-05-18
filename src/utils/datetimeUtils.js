/**
 * This function converts a unix timestamp into datetime
 * @param {unix} timestamp 
 * @returns DD-MM-YYYY hh:mm:ss
 */
export const convertTimestampToDateTime = (timestamp) => {
    
    return timestamp.toDate().toLocaleString()
}

/**
 * This function formats datetime
 * @param {datetime} datetime 
 * @returns DD-MM-YYYY, hh:mm:ss
 */
export const formatDatetime = (datetime) => { 
    datetime = datetime.split("T")
    const date = datetime[0].split("-").reverse().join("-")
    const time = datetime[1].split(".")[0]
    return date + ", " + time
}

export const formatIntToHour = (intTime) => {
    let strTime = intTime.toString();

    switch(strTime.length) {
        case 3:
            strTime = "0" + strTime;
            break
        case 4:
            strTime = strTime;
            break
        default:
            return "--:--"
    }

    return strTime.slice(0, 2) + ":" + strTime.slice(2, strTime.lenght)

}
