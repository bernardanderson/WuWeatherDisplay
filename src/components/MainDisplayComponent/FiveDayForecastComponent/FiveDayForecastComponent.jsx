import {useRef, useLayoutEffect} from "react";
import {useWeatherDataStore} from "../../../store/store.js";
import PropTypes from "prop-types";
import './styles.scss';

/**
 * Renders a line of weather text that can never wrap. Instead the font is shrunk just enough to
 * keep everything on one line inside its card (down to about 45% of the styled size). Without this,
 * long phrases like "Light Showers" wrapped onto two lines and made their card taller than the
 * rest of the row, pushing the bottom off small screens.
 */
function FitPhrase({text}) {
    const ref = useRef(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el || !text) return undefined;

        // The weather column sizes to its content, so it stays the stable box we measure against.
        const availableWidth = () => (el.parentElement ? el.parentElement.clientWidth : 0);

        const fitsAt = (px) => {
            el.style.whiteSpace = "nowrap";
            el.style.fontSize = `${px}px`;
            return el.scrollWidth <= Math.max(availableWidth(), 1);
        };

        const fit = () => {
            // Reset to the stylesheet size so every measurement starts from the natural font size.
            el.style.fontSize = "";
            el.style.overflow = "visible";
            el.style.textOverflow = "";
            const basePx = parseFloat(getComputedStyle(el).fontSize) || 16;
            const minPx = Math.max(9, Math.floor(basePx * 0.45));

            if (fitsAt(basePx)) {
                return; // natural size already fits — nothing to do
            }

            let px = Math.floor(basePx);
            while (px > minPx && !fitsAt(px - 1)) {
                px -= 1;
            }
            el.style.fontSize = `${px}px`;

            if (!fitsAt(px)) {
                // Even the smallest font overflows an extremely narrow card — clip rather than break layout.
                el.style.overflow = "hidden";
                el.style.textOverflow = "ellipsis";
            }
        };

        fit();

        const observer = (typeof ResizeObserver !== "undefined" && el.parentElement)
            ? new ResizeObserver(fit) : undefined;
        if (observer) {
            // Re-fit whenever the card column grows or shrinks (viewport, theme, reflow).
            observer.observe(el.parentElement);
        }

        return () => observer?.disconnect();
    }, [text]);

    return <div ref={ref}>{text}</div>;
}

FitPhrase.propTypes = {
    text: PropTypes.string.isRequired
};

FiveDayForecastComponent.propTypes = {
    fiveDayForecast: PropTypes.array
}

export default function FiveDayForecastComponent(props) {
    const {fiveDayForecast} = props;
    const isFiveDayPastDue = useWeatherDataStore((state) => state.isFiveDayPastDue);
    const fiveDayNotConfigured = useWeatherDataStore((state) => state.fiveDayNotConfigured);
    const lastForecastError = useWeatherDataStore((state) => state.lastForecastError);

    if (fiveDayNotConfigured || fiveDayForecast === undefined)
        return <div>
            {fiveDayNotConfigured
                ? "Forecast is not configured. Add your 5-day forecast API key and postal code."
                : lastForecastError
                    ? `Unable to load the Five Day Forecast (${lastForecastError}). The app will keep retrying.`
                    : "Five Day Forecast Data Missing"}
        </div>;

    const fiveDayForecastCards = fiveDayForecast.map(forecastCard =>
        <div
            className={"forecast-card"}
            key={forecastCard.dayOfWeek}
        >
            <div className={"forecast-card--title"}>{forecastCard.dayOfWeek}</div>
            <div className={"day-night-container"}>
                <div className={"day-night-phrase"}>
                    <div>AM</div>
                    <div>PM</div>
                </div>
                <div className={"day-night-weather"}>
                    <FitPhrase text={forecastCard.weatherPhrase.day}/>
                    <FitPhrase text={forecastCard.weatherPhrase.night}/>
                </div>
            </div>
            <div className={"forecast-temperature"}>H: {forecastCard.maxTemp} / L: {forecastCard.minTemp}</div>
        </div>
    );

    return (
        <div className={"five-day-forecast-section"}>
            {isFiveDayPastDue
                ? <div className={"five-day-forecast--past-due"}>5-Day Forecast is Past Due — showing last available data.</div>
                : undefined}
            <div className={"five-day-forecast-cards"}>
                {fiveDayForecastCards}
            </div>
        </div>
    );
}
