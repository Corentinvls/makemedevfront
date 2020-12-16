export function formatTime(time){
    let timeFormat = new Date(1970, 0, 1); // Epoch
    timeFormat.setSeconds(time)
    return timeFormat
}
