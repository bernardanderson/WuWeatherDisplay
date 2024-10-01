import {toggleDayNightMode} from "./dayNightTimer.js";
import {
    useTimeDataStore,
    useWeatherDataStore,
    useRadarStore
} from "./store.js";

function initializeIntervals() {
    const oneSecondIntervalFunctions = () => {
        const setCurrentDisplayTime = useTimeDataStore.getState().setCurrentTime;
        setCurrentDisplayTime();
        toggleDayNightMode();
    }

    const setUpdatedRadarUrl = () => {
        const setRadarUrl = useRadarStore.getState().setRadarUrl;
        setRadarUrl();
    }

    const fetchCurrentFiveDayForecast = () => {
        const {fetchFiveDayForecast} = useWeatherDataStore.getState();
        fetchFiveDayForecast();
    }

    const fetchCurrentWeatherForecast = () => {
        const {fetchCurrentWeather} = useWeatherDataStore.getState();
        fetchCurrentWeather();
    }

    const getOneSecondIntervals = setInterval(oneSecondIntervalFunctions, 1000);
    const getCurrentWeatherInterval = setInterval(fetchCurrentWeatherForecast, 120000);
    const getFiveDayForecastInterval = setInterval(fetchCurrentFiveDayForecast, 21600000);
    const getRadarMapInterval = setInterval(setUpdatedRadarUrl, 600000);

    setUpdatedRadarUrl();
    fetchCurrentWeatherForecast();
    fetchCurrentFiveDayForecast();

    return () => {
        clearInterval(getOneSecondIntervals);
        clearInterval(getCurrentWeatherInterval);
        clearInterval(getFiveDayForecastInterval);
        clearInterval(getRadarMapInterval);
    };
}

initializeIntervals();