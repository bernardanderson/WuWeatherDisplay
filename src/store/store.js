import { create } from 'zustand'
import {getConfigOrDefault, isConfigured, deleteConfig, saveLocalState} from "../services/LocalStorageService.js";
import { getCurrentWeather, getFiveDayForecast } from "../services/WUApiService.js";
import dayjs from "dayjs";

export const useWeatherDataStore = create((set, get) => ({
    currentWeather: undefined,
    isPastDue: false,
    notConfigured: false,
    currentFiveDayForecast: undefined,
    isFiveDayPastDue: false,
    fiveDayNotConfigured: false,
    fetchCurrentWeather: async () => {
        const result = await getCurrentWeather();
        switch (result.status) {
            case "ok":
                set({ currentWeather: result.data, isPastDue: false, notConfigured: false });
                break;
            case "not-configured":
                set({ notConfigured: true });
                break;
            default: // "error" — endpoint unreachable / bad response; keep last good data and flag it
                if (get().currentWeather !== undefined) {
                    set({ isPastDue: true });
                }
                break;
        }
    },
    fetchFiveDayForecast: async () => {
        const result = await getFiveDayForecast();
        switch (result.status) {
            case "ok":
                set({ currentFiveDayForecast: result.data, isFiveDayPastDue: false, fiveDayNotConfigured: false });
                break;
            case "not-configured":
                set({ fiveDayNotConfigured: true });
                break;
            default: // "error" — endpoint unreachable / bad response; keep last good forecast and flag it
                if (get().currentFiveDayForecast !== undefined) {
                    set({ isFiveDayPastDue: true });
                }
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
