import ClockComponent from "./ClockComponent/ClockComponent.jsx";
import FiveDayForecastComponent from "./FiveDayForecastComponent/FiveDayForecastComponent.jsx";
import WeatherMapComponent from "../WeatherMapComponent/WeatherMapComponent.jsx";
import PropTypes from "prop-types";
import './styles.scss';

MainDisplayComponent.propTypes = {
    navigate: PropTypes.func.isRequired,
    currentWeatherData: PropTypes.object,
    configState: PropTypes.object,
    fiveDayForecast: PropTypes.array
};

export default function MainDisplayComponent(props) {
    const {navigate, currentWeatherData, fiveDayForecast, configState} = props;

    return (
        (currentWeatherData === undefined) ?
            <>
                <div>Loading...</div>
                <button onClick={() => navigate("/config")}>Configuration</button>
            </> :
            <div className="access-weather--overview-display">
                <ClockComponent
                    weatherDateTime={currentWeatherData?.time}
                />
                <hr/>
                <div className="main-data--panel">
                    <div className="edge-column">
                        <div className="full-width">
                            <div className="panel-heading">Temperature</div>
                            <div className="sub-item">{currentWeatherData.tempf}<span className="smaller-font">°F</span></div>
                            <hr/>
                        </div>
                        <div className="full-width">
                            <div className="panel-heading">Humidity</div>
                            <div className="sub-item">{currentWeatherData.humidity}<span className="smaller-font">%</span></div>
                            <hr/>
                        </div>
                        <div className="full-width">
                            <div className="panel-heading">Dewpoint</div>
                            <div className="sub-item">{currentWeatherData.dewptf}<span className="smaller-font">°F</span></div>
                        </div>
                    </div>
                    <div className="radar-display">
                        <WeatherMapComponent
                            inDarkMode={configState.wuConfig.inDarkMode}
                        />
                        <button onClick={() => navigate("/config")}>Configuration</button>
                    </div>
                    <div className="edge-column">
                        <div className="full-width">
                            <div className="panel-heading">Today&apos;s Rainfall</div>
                            <div className="sub-item">{Number.parseFloat(currentWeatherData.dailyrainin).toFixed(2)}<span
                                className="smaller-font">{" in".replace(/ /g, "\u00a0")}</span></div>
                            <hr/>
                        </div>
                        <div className="full-width">
                            <div className="panel-heading">Windspeed</div>
                            <div className="sub-item">
                                {currentWeatherData.windspeedmph}
                                <span className="smaller-font">{"MPH  ".replace(/ /g, "\u00a0")}</span>
                                <span className="medium-font">{currentWeatherData.winddir}</span>
                            </div>
                            <hr/>
                        </div>
                        <div className="full-width">
                            <div className="panel-heading">Pressure</div>
                            <div className="sub-item">{currentWeatherData.baromin}<span
                                className="smaller-font">{" in".replace(/ /g, "\u00a0")}</span></div>
                        </div>
                    </div>
                </div>
                <FiveDayForecastComponent
                    fiveDayForecast={fiveDayForecast}
                />
            </div>
    );
}
