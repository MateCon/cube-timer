export const format_time = (minutes, seconds, hundreads) => {
    const add_0 = n => n < 10 ? '0' : '';
    const new_min = add_0(minutes) + minutes.toString();
    const new_sec = add_0(seconds) + seconds.toString();
    const new_hun = add_0(hundreads) + hundreads.toString();
    return new_min + ':' + new_sec + '.' + new_hun;
}

export const format_inspection = seconds => {
    return seconds < -2 && 'DNF' || seconds < 0 && '+2' || seconds;
}