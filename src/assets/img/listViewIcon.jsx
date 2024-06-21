import PropTypes from "prop-types";

export const ListViewIcon = ({className}) => {
    return (
        <div className={className}>
            <svg version="1.1" id="Layer_1_1_" xmlns="http://www.w3.org/2000/svg"
                 x="0px" y="0px"
                 width={16}
                 height={16}
                 viewBox="0 0 16 16"
                fill={"currentColor"}
            >
                <rect width="16" height="2"/>
                <rect y="7" width="16" height="2"/>
                <rect y="14" width="16" height="2"/>
            </svg>
        </div>
    );
};

ListViewIcon.propTypes = {
    className: PropTypes.string,
};