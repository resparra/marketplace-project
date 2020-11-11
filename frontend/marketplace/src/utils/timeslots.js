import moment from "moment";

/**
 * Create a list of time slots of 15 minutes from start to end
 * @param  {Sring}  start Start time ex. "08:00"
 * @param  {Number} end End time ex. "17:00"
 * @return {list} List of time slots between start and end ex. ["08:00", "8:15" ...]
 */
function getTimeSpots(start, end) {
    var startTime = moment(start, 'HH:mm');
    var endTime = moment(end, 'HH:mm');

    if (endTime.isBefore(startTime)) {
        endTime.add(1, 'day');
    }

    var timeSpots = [];

    while (startTime <= endTime) {
        timeSpots.push(new moment(startTime).format('HH:mm'));
        startTime.add(15, 'minutes');
    }
    return timeSpots;
}

export default getTimeSpots
