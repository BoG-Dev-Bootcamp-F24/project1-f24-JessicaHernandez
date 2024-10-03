import './ButtonInfo.css'

function ButtonInfo({ label, onClick }) {
    return (
        <div className="button" onClick={onClick}>
            <p>{label}</p>
        </div>
    );
}

export default ButtonInfo;