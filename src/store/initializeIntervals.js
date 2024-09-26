import {toggleDayNightMode} from "./dayNightTimer.js";
import {
    useTimeDataStore,
    useWeatherDataStore,
    useConfigStore,
    useRadarStore
} from "./store.js";

function initializeIntervals() {
    const {wuConfig, setWuConfig} = useConfigStore.getState();
    const {fetchCurrentWeather, fetchFiveDayForecast} = useWeatherDataStore.getState();
    const setCurrentDisplayTime = useTimeDataStore.getState().setCurrentTime;
    const setRadarUrl = useRadarStore.getState().setRadarUrl;

    const oneSecondIntervalFunctions = () => {
        setCurrentDisplayTime();
        toggleDayNightMode(wuConfig, setWuConfig);
    }

    const getOneSecondIntervals = setInterval(oneSecondIntervalFunctions, 1000);
    const getCurrentWeatherInterval = setInterval(fetchCurrentWeather, wuConfig.weatherUpdateInterval);
    const getFiveDayForecastInterval = setInterval(fetchFiveDayForecast, 21600000);
    const getRadarMapInterval = setInterval(setRadarUrl, wuConfig.mapUpdateInterval);

    setRadarUrl();
    setCurrentDisplayTime();
    fetchCurrentWeather();
    fetchFiveDayForecast();

    return () => {
        clearInterval(getOneSecondIntervals);
        clearInterval(getCurrentWeatherInterval);
        clearInterval(getFiveDayForecastInterval);
        clearInterval(getRadarMapInterval);
    };
}

initializeIntervals();