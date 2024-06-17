import './btn.css';
import PropTypes from "prop-types";

export const Btn = ({children, ...props}) => {
  return (
    <button {...props} className={!props.className ? 'btn' : `btn ${props.className}`}>
      {children}
    </button>
  )
};

Btn.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Btn.defaultProps = {
  className: '',
};