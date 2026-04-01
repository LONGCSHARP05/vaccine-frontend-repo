function InputField({ label, type = "text", value = "", onChange, className = "", ...rest }) {
  return (
    <div className={`input-field ${className}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

export default InputField;
