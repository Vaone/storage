import PropTypes from "prop-types";

export const FileIcon = ({className}) => {
    return (
        <div className={className}>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 368.553 368.553" fill={"currentColor"}>
                <path d="M239.68,0H42.695v368.553h283.164V86.811L239.68,0z M244.057,25.7l56.288,56.701h-56.288V25.7z M57.695,353.553V15
                h171.362v82.401h81.802v256.151H57.695V353.553z"/>
                <rect x="86.435" y="82.401" width="121.875" height="15"/>
                <rect x="86.435" y="151.122" width="195.685" height="15"/>
                <rect x="86.435" y="219.843" width="195.685" height="15"/>
                <rect x="86.435" y="288.563" width="195.685" height="15"/>
            </svg>
        </div>
    );
};

FileIcon.propTypes = {
    className: PropTypes.string,
};