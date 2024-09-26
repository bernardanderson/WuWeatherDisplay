import { useState } from "react";
import { radarListing } from "./RadarListing.js";
import { defaultConfig } from "../../store/defaultConfig.js";
import ClockInput from "./ClockInput/ClockInput.jsx";
import PropTypes from "prop-types";

import './styles.scss';

ConfigurationComponent.propTypes = {
    navigate: PropTypes.func.isRequired,
    configState: PropTypes.shape({
        wuConfig: PropTypes.object.isRequired,
        setWuConfigAndLocalState: PropTypes.func.isRequired,
        deleteConfig: PropTypes.func.isRequired,
        setWuConfig: PropTypes.func.isRequired
    }).isRequired
};

export default function ConfigurationComponent(props) {
    const { navigate, configState } = props;

    const [currentConfig, setCurrentConfig] = useState(configState.wuConfig);

    const handleSave = () => {
        configState.setWuConfigAndLocalState(currentConfig);
        navigate("/");
        location.reload(true);
    }

    const handleDeleteConfig = () => {
        configState.deleteConfig();
        setCurrentConfig(defaultConfig);
        configState.setWuConfig(defaultConfig);
    }

    return (
        <div className={"configuration--main-display"}>
            <div className={"input-row"}>
                <span>WU Base API Key:</span>
                <input className={"apikey-width"}
                       value={currentConfig.baseApiKey}
                       onChange={(e) => {
                           setCurrentConfig({...currentConfig, baseApiKey: e.target.value})
                       }}
                />
            </div>

            <div className={"input-row"}>
                <span>WU 5 Day Forecast API Key:</span>
                <input className={"apikey-width"}
                       value={currentConfig.fiveDayApiKey}
                       onChange={(e) => {
                           setCurrentConfig({...currentConfig, fiveDayApiKey: e.target.value})
                       }}
                />
            </div>

            <div className={"input-row"}>
                <span>Weather Station Id:</span>
                <input
                    value={currentConfig.weatherStationId}
                    onChange={(e) => {
                        setCurrentConfig({...currentConfig, weatherStationId: e.target.value})
                    }}
                />
            </div>

            <div className={"input-row"}>
                <span>Five Digit Postal Code:</span>
                <input
                    value={currentConfig.postalCode}
                    type={"number"}
                    onChange={(e) => {
                        setCurrentConfig({...currentConfig, postalCode: e.target.value})
                    }}
                />
            </div>

            <div className={"input-row"}>
                <span>Radar Location:</span>
                <select name="radars"
                        size={1}
                        value={currentConfig.radarMapId}
                        onChange={
                            (e) => {
                                setCurrentConfig({...currentConfig, radarMapId: e.target.value})
                            }}
                >
                    {
                        radarListing.map(radar => (
                            <option key={radar.value} value={radar.value}>{radar.label}</option>
                        ))}
                </select>
            </div>
            {
                (!currentConfig.useDayNight) ?
                <div className={"input-row"}>
                    <span>Use Dark Mode:</span>
                    <input type="checkbox" name="DarkMode"
                           checked={currentConfig.darkModeOnly}
                           onChange={() => setCurrentConfig(
                               {
                                        ...currentConfig,
                                        darkModeOnly: !currentConfig.darkModeOnly,
                                        inDarkMode: !currentConfig.darkModeOnly
                               })}
                    />
                </div> : undefined
            }

            {
                (!currentConfig.darkModeOnly) ?
                    <div className={"input-row"}>
                        <div>
                            <span>Use Day/Night </span>
                            <input type="checkbox" name="useDayNight"
                                   checked={currentConfig.useDayNight}
                                   onChange={() => setCurrentConfig(
                                       {
                                                ...currentConfig,
                                                useDayNight: !currentConfig.useDayNight,
                                                inDarkMode: false
                                       }
                                   )}
                            />
                        </div>
                        {
                            (currentConfig.useDayNight) ? <>
                                <ClockInput
                                    inputLabel={"Light Mode Begin:"}
                                    timeValue={currentConfig.dayModeStart}
                                    handleInput={(value) =>
                                        setCurrentConfig({...currentConfig, dayModeStart: value})
                                    }
                                />
                                <ClockInput
                                    inputLabel={"Dark Mode Begin:"}
                                    timeValue={currentConfig.darkModeStart}
                                    handleInput={(value) =>
                                        setCurrentConfig({...currentConfig, darkModeStart: value})
                                    }
                                />
                            </> : undefined
                        }
                    </div> : undefined
            }

            <div className={"input-row"}>
                <span>Map Update Interval (in seconds):</span>
                <input
                    value={currentConfig.mapUpdateInterval / 1000}
                    type={"number"}
                    onChange={(e) =>
                        setCurrentConfig({...currentConfig, mapUpdateInterval: e.target.value * 1000})
                    }
                />
            </div>

            <div className={"input-row"}>
                <span>Current Weather Update Interval (in seconds):</span>
                <input
                    value={currentConfig.weatherUpdateInterval / 1000}
                    type={"number"}
                    onChange={(e) =>
                        setCurrentConfig({...currentConfig, weatherUpdateInterval: e.target.value * 1000})
                    }
                />
            </div>

            <div className={"input-row"}>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => navigate("/")}>Cancel</button>
                <button className={"clear-button"} onClick={handleDeleteConfig}>Clear</button>
            </div>
        </div>
    );
}


