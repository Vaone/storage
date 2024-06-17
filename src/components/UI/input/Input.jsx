import './input.css';

const Input = (props) => {
  return (
    <input 
      value={props.value} 
      onChange={(event)=> props.setValue(event.currentTarget.value)}
      type={props.type} placeholder={props.placeholder} 
      className="myinput"
    />
  )
};

export default Input;