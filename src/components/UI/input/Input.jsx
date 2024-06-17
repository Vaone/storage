import './input.css';
import PropTypes from "prop-types";

export const Input = (props) => {
  return (
    <input 
      value={props.value} 
      onChange={(event)=> props.setValue(event.currentTarget.value)}
      type={props.type} placeholder={props.placeholder} 
      className="myinput"
    />
  )
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  className: '',
};