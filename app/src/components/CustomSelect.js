import { useState, useRef, useEffect } from "react";

const CustomSelect = ({
    options,
    selectedCurrency,
    enteredValue,
    convertedValues,
    onNumberChange,
    onCurrencyChange,
    index,
    currentIndex,
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [enteredNumber, setEnteredNumber] = useState(null);
    const ref = useRef(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onCurrencyChange(option, index);
    };

    const handleNumberChange = (event) => {
        const number = event.target.value;
        setEnteredNumber(number);
        onNumberChange(number, index);
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="selectGroup" ref={ref}>
            <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? (
                    <div className="selected-option">
                        <img
                            src={`./flags/${selectedOption}.png`}
                            alt={selectedOption}
                            className={selectedOption}
                        />
                        {selectedOption}
                    </div>
                ) : (
                    <div className="selected-option">Select</div>
                )}
                {isOpen && (
                    <div className="listBox">
                        <ul className="options-list">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleOptionClick(option)}
                                    className="option"
                                >
                                    <img src={`./flags/${option}.png`} alt={option} />
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <input
                type="text"
                value={
                    enteredValue !== null && convertedValues
                        ? index !== currentIndex ? convertedValues[index] : enteredValue
                        : ""
                }
                onChange={handleNumberChange}
                placeholder="00.00"
                className="money"
            />
        </div>
    );
};

export default CustomSelect;
