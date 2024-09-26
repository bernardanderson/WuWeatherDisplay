import HttpService from './HttpService';
import { useConfigStore } from "../store/store.js";
import mapper from "./ModelMapperService.js";

const WU_BASE_URL = "https://api.weather.com";
const httpService = new HttpService(WU_BASE_URL);

export async function getCurrentWeather() {
    try {
        const config = useConfigStore.getState().wuConfig;
        if (!config.baseApiKey && !config.weatherStationId)
            return undefined;

        const rawData =
            await httpService.getData(`/v2/pws/observations/current?stationId=${config.weatherStationId}&format=json&units=e&apiKey=${config.baseApiKey}`)
        return mapper.mapRawWeatherConditions(rawData.observations[0]);
    } catch(e) {
        console.error('Error in getCurrentWeather: ', e);
        return undefined;
    }
}

export async function getFiveDayForecast() {
    try {
        const config = useConfigStore.getState().wuConfig;
        if (!config.fiveDayApiKey && !config.weatherStationId)
            return undefined;

        const rawData =
            await httpService.getData(`/v3/wx/forecast/daily/5day?postalKey=${config.postalCode}:US&units=e&language=en-US&format=json&apiKey=${config.fiveDayApiKey}`)

        if (rawData === null || rawData === undefined || rawData.error) return undefined;
        return mapper.mapRawFiveDayForecast(rawData);
    } catch(e) {
        console.error('Error in getFiveDayForecast: ', e);
        return undefined;
    }
}



