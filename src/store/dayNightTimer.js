import dayjs from 'dayjs';

const isCurrentTimeBetween = (startTime, endTime) => {
    const now = dayjs();
    const start = dayjs(`${now.format('YYYY-MM-DD')} ${startTime}`, 'YYYY-MM-DD HH:mm');
    const end = dayjs(`${now.format('YYYY-MM-DD')} ${endTime}`, 'YYYY-MM-DD HH:mm');

    return now.isAfter(start) && now.isBefore(end);
};

export function toggleDayNightMode(wuConfig, setWuConfig) {
    if (!wuConfig.darkModeOnly && wuConfig.useDayNight) {
        const isTimeBetweenDayDarkModeTimes = isCurrentTimeBetween(wuConfig.dayModeStart, wuConfig.darkModeStart)
        if (isTimeBetweenDayDarkModeTimes && wuConfig.inDarkMode) {
            setWuConfig({...wuConfig, inDarkMode: false});
        } else if (!isTimeBetweenDayDarkModeTimes && !wuConfig.inDarkMode) {
            setWuConfig({...wuConfig, inDarkMode: true});
        }
    }
}

