import './ButtonInfo.css'

function ButtonInfo({ label, onClick, className }) {
    return (
        <button className={`info_button ${className}`} onClick={onClick}>
            {label}
        </button>
    );
}


export default ButtonInfo;