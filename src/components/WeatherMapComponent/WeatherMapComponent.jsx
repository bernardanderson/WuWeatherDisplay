import {useRadarStore} from "../../store/store.js";
import PropTypes from "prop-types";
import './styles.scss';

WeatherMapComponent.propTypes = {
    inDarkMode: PropTypes.bool
}

export default function WeatherMapComponent({inDarkMode}) {
    const radarUrl = useRadarStore((state) => state.radarUrl);

    return (
        <div id={"map-img"} className={`image-container ${ inDarkMode ? "image-container--dark" : ""}`}>
            <img className="img-width"
                 alt="Weather Map"
                 src={radarUrl}/>
        </div>
    );
}

