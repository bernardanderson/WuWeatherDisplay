import {defaultConfig} from "../store/defaultConfig.js";

export function getConfigOrDefault() {
    const currentConfig = localStorage.getItem("wuWeatherUser");
    if (currentConfig) {
        return JSON.parse(localStorage.getItem("wuWeatherUser"));
    }

    return defaultConfig;
}

export function saveLocalState(currentConfig) {
    localStorage.setItem('wuWeatherUser', JSON.stringify(currentConfig));
}

export function isConfigured() {
    const currentConfig = localStorage.getItem("wuWeatherUser");
    return !!(currentConfig);
}

export function deleteConfig() {
    localStorage.removeItem('wuWeatherUser');
}
