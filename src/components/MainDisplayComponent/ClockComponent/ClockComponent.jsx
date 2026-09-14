import {useTimeDataStore, useWeatherDataStore} from "../../../store/store.js";
import PropTypes from "prop-types";

const ClockComponent = ({weatherDateTime}) => {
    const currentTime = useTimeDataStore((state) => state.currentTime);
    const isPastDue = useWeatherDataStore((state) => state.isPastDue);

    return <div className="current-time--header">
        {currentTime}
        <div className="current-time--last-updated">
            Last Updated: {weatherDateTime}{isPastDue ? " (Past Due)" : ""}
        </div>
    </div>
}

ClockComponent.propTypes = {
    weatherDateTime: PropTypes.string
};

export default ClockComponent;



