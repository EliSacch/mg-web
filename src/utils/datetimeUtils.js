/**
 * This function formats datetime to date only
 * @param {datetime} datetime 
 * @returns DD-MM-YYYY
 */
export const formatDate = (datetime) => {
    datetime = datetime.split("T")
    return datetime[0].split("-").reverse().join("-")
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

/**
 * This function converts a unix to time only
 * @param {int} unixTimestamp
 * @returns hh:mm
 */
export const unixToTime = (unixTimestamp) => {
    const hours =  Math.trunc(unixTimestamp / 60 / 60); 
    const minutes = ((unixTimestamp / 60 / 60) - hours) * 60; 

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * This function string time to unix
 * @param {string} time
 * @returns unix
 */
export const timeToUnix = (time) => {
    return new Date('1970-01-01T' + time + 'Z').getTime() / 1000;
}
