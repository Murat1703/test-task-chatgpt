import './button.css'
export default function Button({imgSource, classList, onClick, onMouseDown, onMouseLeave, onMouseUp, onTouchStart, onTouchEnd}){
    return(
        <button className={classList} onClick={onClick} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseUp={onMouseUp} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img src={imgSource} alt="img" />
        </button>
    )
}