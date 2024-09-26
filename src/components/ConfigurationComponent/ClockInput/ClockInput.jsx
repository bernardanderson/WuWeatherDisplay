import PropTypes from "prop-types";

ClockInput.propTypes = {
    inputLabel: PropTypes.string.isRequired,
    timeValue: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired,
    classes: PropTypes.string
}

export default function ClockInput(props) {
    const { inputLabel, timeValue, handleInput, classes } = props;

    return (
        <>
            <span>{inputLabel}</span>
            <input
                type="time"
                value={timeValue}
                onChange={(e) => handleInput(e.target.value)}
                className={(classes) ? `${classes}` : ""}
            />
        </>
    )
}