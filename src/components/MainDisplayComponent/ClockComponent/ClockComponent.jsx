import {useTimeDataStore} from "../../../store/store.js";
import PropTypes from "prop-types";

const ClockComponent = ({weatherDateTime}) => {
    const currentTime = useTimeDataStore((state) => state.currentTime);

    return <div className="current-time--header">
        {currentTime}
        <div className="current-time--last-updated">
            Last Updated: {weatherDateTime}
        </div>
    </div>
}

ClockComponent.propTypes = {
    weatherDateTime: PropTypes.string
};

export default ClockComponent;



