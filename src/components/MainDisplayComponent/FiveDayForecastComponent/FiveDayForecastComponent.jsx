import PropTypes from "prop-types";
import './styles.scss';

FiveDayForecastComponent.propTypes = {
    fiveDayForecast: PropTypes.array
}

export default function FiveDayForecastComponent(props) {
    const {fiveDayForecast} = props;

    if (fiveDayForecast === undefined)
        return <div>Five Day Forecast Data Missing</div>;

    const fiveDayForecastCards = fiveDayForecast.map(forecastCard =>
        <div
            className={"forecast-card"}
            key={forecastCard.dayOfWeek}
        >
            <div className={"forecast-card--title"}>{forecastCard.dayOfWeek}</div>
            <div className={"day-night-container"}>
                <div className={"day-night-phrase"}>
                    <div>Day:</div>
                    <div>Night:</div>
                </div>
                <div className={"day-night-weather"}>
                    <div>{forecastCard.weatherPhrase.day}</div>
                    <div>{forecastCard.weatherPhrase.night}</div>
                </div>
            </div>
            <div className={"forecast-temperature"}>H: {forecastCard.maxTemp} / L: {forecastCard.minTemp}</div>
        </div>
    );

    return (
        <div className={"five-day-forecast-cards"}>
            {fiveDayForecastCards}
        </div>
    );
}
