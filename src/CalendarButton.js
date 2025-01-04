function CalendarButton({direction, onChangeMonth}) {
    return (
        <div className={`button-wrapper ${direction === 1?"next":"prev"}`}>
            <button onClick={() => onChangeMonth(direction)}></button>
        </div>
    );
}

export default CalendarButton;