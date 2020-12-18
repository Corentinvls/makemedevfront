export function formatTime(time){
    return time * 1000
}

export default function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
