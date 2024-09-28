import {useWeatherDataStore, useRadarStore} from "../store/store.js";

export default function callAllApis() {
    useRadarStore.getState().setRadarUrl();
    const {fetchCurrentWeather, fetchFiveDayForecast} = useWeatherDataStore.getState();
    fetchCurrentWeather();
    fetchFiveDayForecast();
}