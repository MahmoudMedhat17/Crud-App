
const Input = ({ label, type, value, onChangeFunc }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <div>
                <label htmlFor={label} style={{ fontSize: "20px", fontWeight: "bold" }}>{label}:</label>
            </div>
            <input
                type={type}
                value={value}
                onChange={onChangeFunc}
                style={{ height: "30px", width: "400px", paddingLeft: "10px" }}
            />
        </div>
    )
}

export default Input;