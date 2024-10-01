import { create } from 'zustand'
import {getConfigOrDefault, isConfigured, deleteConfig, saveLocalState} from "../services/LocalStorageService.js";
import { getCurrentWeather, getFiveDayForecast } from "../services/WUApiService.js";
import dayjs from "dayjs";

export const useWeatherDataStore = create((set, get) => ({
    currentWeather: undefined,
    currentFiveDayForecast: undefined,
    fetchCurrentWeather: async () => {
        const data = await getCurrentWeather();
        if (data === undefined && get().currentWeather !== undefined) {
            const pastCurrentWeather = get().currentWeather
            set({ currentWeather: {...pastCurrentWeather, time: pastCurrentWeather.time + " (Past Due)"}});
            return;
        };
        set({ currentWeather: data });
    },
    fetchFiveDayForecast: async () => {
        const data = await getFiveDayForecast();
        set({ currentFiveDayForecast: data });
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
