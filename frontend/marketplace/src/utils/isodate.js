/**
 * Generate an ISO format date string
 * @param  {Date} date Javascript Date object
 * @return {String} Date string with format YYYY-MM-DD
 */
function isoDateString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return year + '-' + month + '-' + dt
}

export default isoDateString;
