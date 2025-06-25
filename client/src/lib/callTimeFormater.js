export const callTimeFormater = (seconds) =>{
    const hour = 60 * 60;
    let time = null;
    time = seconds >= hour ? [seconds / 60 / 60 ,(seconds / 60)  % 60, seconds % 60] : [seconds / 60, seconds % 60]
    return time.map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')
}