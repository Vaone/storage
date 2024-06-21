import PropTypes from "prop-types";

export const PlateViewIcon = ({className}) => {
    return (
        <div className={className}>
            <svg version="1.1" id="Layer_1_1_" xmlns="http://www.w3.org/2000/svg"
                 fill={"currentColor"}
                 x="0px" y="0px"
                 viewBox="0 0 16 16" width={16} height={16}>
                <rect width="4" height="4"/>
                <rect x="6" width="4" height="4"/>
                <rect x="12" width="4" height="4"/>
                <rect y="6" width="4" height="4"/>
                <rect x="6" y="6" width="4" height="4"/>
                <rect x="12" y="6" width="4" height="4"/>
                <rect y="12" width="4" height="4"/>
                <rect x="6" y="12" width="4" height="4"/>
                <rect x="12" y="12" width="4" height="4"/>
            </svg>
        </div>
    );
};

PlateViewIcon.propTypes = {
    className: PropTypes.string,
};