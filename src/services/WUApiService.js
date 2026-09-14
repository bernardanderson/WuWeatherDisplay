import HttpService from './HttpService';
import { useConfigStore } from "../store/store.js";
import mapper from "./ModelMapperService.js";

const WU_BASE_URL = "https://api.weather.com";
const httpService = new HttpService(WU_BASE_URL);

export async function getCurrentWeather() {
    const config = useConfigStore.getState().wuConfig;
    if (!config.baseApiKey || !config.weatherStationId)
        return { status: "not-configured" };

    try {
        const rawData =
            await httpService.getData(`/v2/pws/observations/current?stationId=${config.weatherStationId}&format=json&units=e&apiKey=${config.baseApiKey}`)
        const mapped = mapper.mapRawWeatherConditions(rawData.observations[0]);
        return mapped === undefined ? { status: "error" } : { status: "ok", data: mapped };
    } catch(e) {
        console.error('Error in getCurrentWeather: ', e);
        return { status: "error" };
    }
}

export async function getFiveDayForecast() {
    const config = useConfigStore.getState().wuConfig;
    if (!config.fiveDayApiKey || !config.postalCode)
        return { status: "not-configured" };

    try {
        const rawData =
            await httpService.getData(`/v3/wx/forecast/daily/5day?postalKey=${config.postalCode}:US&units=e&language=en-US&format=json&apiKey=${config.fiveDayApiKey}`)

        if (rawData === null || rawData === undefined || rawData.error)
            return { status: "error" };

        const mapped = mapper.mapRawFiveDayForecast(rawData);
        return mapped === undefined ? { status: "error" } : { status: "ok", data: mapped };
    } catch(e) {
        console.error('Error in getFiveDayForecast: ', e);
        return { status: "error" };
    }
}



