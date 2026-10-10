import { create } from 'zustand'
import {getConfigOrDefault, isConfigured, deleteConfig, saveLocalState} from "../services/LocalStorageService.js";
import { getCurrentWeather, getFiveDayForecast } from "../services/WUApiService.js";
import dayjs from "dayjs";

export const useWeatherDataStore = create((set, get) => ({
    currentWeather: undefined,
    isPastDue: false,
    notConfigured: false,
    lastWeatherError: null,
    currentFiveDayForecast: undefined,
    isFiveDayPastDue: false,
    fiveDayNotConfigured: false,
    lastForecastError: null,
    fetchCurrentWeather: async () => {
        const result = await getCurrentWeather();
        switch (result.status) {
            case "ok":
                set({ currentWeather: result.data, isPastDue: false, notConfigured: false, lastWeatherError: null });
                break;
            case "not-configured":
                set({ notConfigured: true, lastWeatherError: null });
                break;
            default: // "error" — endpoint unreachable / rejected key / bad response; keep last good data and flag it.
                     // A request was actually made here, so clear any stale unconfigured flag instead of letting a
                     // previous incomplete save masquerade as one (the real failure reason lives in lastWeatherError).
                set({
                    lastWeatherError: result.error ?? "Request failed",
                    notConfigured: false,
                    ...(get().currentWeather !== undefined && { isPastDue: true })
                });
                break;
        }
    },
    fetchFiveDayForecast: async () => {
        const result = await getFiveDayForecast();
        switch (result.status) {
            case "ok":
                set({ currentFiveDayForecast: result.data, isFiveDayPastDue: false, fiveDayNotConfigured: false, lastForecastError: null });
                break;
            case "not-configured":
                set({ fiveDayNotConfigured: true, lastForecastError: null });
                break;
            default: // same reasoning as fetchCurrentWeather above (see comment there)
                set({
                    lastForecastError: result.error ?? "Request failed",
                    fiveDayNotConfigured: false,
                    ...(get().currentFiveDayForecast !== undefined && { isFiveDayPastDue: true })
                });
                break;
        }
    }
}));

const getCurrentTime = () => dayjs().format('MMMM D YYYY, h:mm:ss a');
export const useTimeDataStore = create((set) => ({
    currentTime: getCurrentTime(),
    setCurrentTime: () => set({ currentTime: getCurrentTime()}),
}));

export const useConfigStore = create((set) => ({
    wuConfig: getConfigOrDefault(),
    setWuConfigAndLocalState: (config) => {
        saveLocalState(config);
        set({wuConfig: config})
    },
    setWuConfig: (config) => set({wuConfig: config}),
    hasConfig: () => isConfigured(),
    deleteConfig: () => deleteConfig()
}));

export const useRadarStore = create((set) => ({
    radarUrl: undefined,
    setRadarUrl: () => {
        const updateUrlRandomizer = () => Math.random().toString().slice(2);
        const radarMapId = () => useConfigStore.getState().wuConfig.radarMapId;
        set({radarUrl: `https://radar.weather.gov/ridge/standard/${radarMapId()}_loop.gif?t=${updateUrlRandomizer()}`})
    }
}));
