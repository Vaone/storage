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
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};