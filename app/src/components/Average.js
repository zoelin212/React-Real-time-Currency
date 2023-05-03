import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRotate,
    faCoins,
} from "@fortawesome/free-solid-svg-icons";
import "./average.css";

const Average = () => {
    // put them in a same useState for better control
    const [inputList, setInputList] = useState([{ rate: "", amount: "" }]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { rate: "", amount: "" }]);
    };

    const handleRemoveClick = (index) => {
        const list = [...inputList];

        // Only one element is removed (i.e. the group of input boxes associated with the clicked "Remove" button).
        list.splice(index, 1);
        setInputList(list);
    };

    const calculateAverageRate = () => {
        let totalRate = 0;
        let totalAmount = 0;

        inputList.forEach((input) => {
            if (input.rate && input.amount) {
                totalRate += parseFloat(input.rate) * parseFloat(input.amount);
                totalAmount += parseFloat(input.amount);
            }
        });

        return totalAmount === 0 ? 0 : totalRate / totalAmount;
    };

    return (
        <div className="AverageBox">
            <div className="titleBox">
                <h2>
                    <Link to="/">
                        <FontAwesomeIcon icon={faRotate} /> Converter
                    </Link>
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faCoins} /> Average
                </h2>
            </div>
            <div className="changeBox">
                <div className="costBox">
                    {inputList.map((x, i) => {
                        return (
                            <div className="costInputBox" key={i}>
                                <div className="costLeft">
                                    {i === 0 && <h3>Rate</h3>}
                                    <input
                                        name="rate"
                                        className="costInput"
                                        value={x.rate}
                                        onChange={(e) => handleInputChange(e, i)}
                                    />
                                </div>

                                <div className="costRight">
                                    {i === 0 && <h3>Amount</h3>}
                                    <input
                                        name="amount"
                                        className="costInput"
                                        value={x.amount}
                                        onChange={(e) => handleInputChange(e, i)}
                                    />
                                    {inputList.length > 1 && (
                                        <button className="costBtn" onClick={() => handleRemoveClick(i)}>X</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <hr></hr>
                <button className="costBtn moreBtn" onClick={handleAddClick}>+ More</button>

                <h3>Average purchase rate</h3>
                <div className="showRateBox">
                    <h3>{calculateAverageRate().toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
};

export default Average;
