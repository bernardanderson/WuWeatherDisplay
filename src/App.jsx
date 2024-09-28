import { Route, Routes, useNavigate } from 'react-router-dom';
import MainDisplayComponent from "./components/MainDisplayComponent/MainDisplayComponent.jsx";
import ConfigurationComponent from "./components/ConfigurationComponent/ConfigurationComponent.jsx";
import {useConfigStore, useWeatherDataStore} from "./store/store.js";
import { useEffect } from "react";

import './App.css';

function App() {
    const navigate = useNavigate();
    const configState = useConfigStore((state) => state);
    const weatherData = useWeatherDataStore((state) => state);

    useEffect(() => {
        const currentPath = window.location.pathname;

        console.log(!configState.hasConfig());

        if (currentPath === "/config" || !configState.hasConfig()) {
            navigate("/config");
        } else {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const rootElement = document.documentElement;

        if (configState.wuConfig.inDarkMode) {
            rootElement.classList.add("app-font-and-background--dark");
        } else {
            rootElement.classList.remove("app-font-and-background--dark");
        }
    }, [configState.wuConfig.inDarkMode]);

    return (
        <Routes>
            <Route path="/" element={
                <MainDisplayComponent
                    navigate={navigate}
                    currentWeatherData={weatherData.currentWeather}
                    fiveDayForecast={weatherData.currentFiveDayForecast}
                    configState={configState}
                />
            }/>
            <Route path="/config" element={
                <ConfigurationComponent
                    navigate={navigate}
                    configState={configState}
                />
            }/>
        </Routes>
    );
}

export default App;
