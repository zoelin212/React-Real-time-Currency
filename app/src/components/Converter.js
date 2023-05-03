import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faCoins } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from './CustomSelect';
import "./converter.css";

const Converter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [rates, setRates] = useState([]);
    const [enteredNumber, setEnteredNumber] = useState(null);
    const [customSelects, setCustomSelects] = useState([
        { currency: null, value: null },
        { currency: null, value: null },
        { currency: null, value: null },
        { currency: null, value: null },
        { currency: null, value: null },
        { currency: null, value: null },
    ]);
    const [convertedValues, setConvertedValues] = useState(Array(6).fill(null));

    useEffect(() => {
        const fetchCurrencies = async () => {
            const response = await fetch(
                "https://zoelindev.com/Real-time-Currency/api/currency_code.php"
            );
            const data = await response.json();
            setCurrencies(data.currency_codes);
            setRates(data.rate);
            //console.log(rates);
        };

        fetchCurrencies();
    }, []);

    const handleEnteredNumberChange = (number, index) => {
        const newCustomSelects = [...customSelects];
        newCustomSelects[index].value = number;
        setCustomSelects(newCustomSelects);
        console.log(newCustomSelects);
        
        // 如果沒有選擇幣值，則跳過更新轉換值的操作
        if (!newCustomSelects[index].currency) {
            return;
        }
    
        // Calculate the converted values and update the state
        const newConvertedValues = calculateConvertedValue(index);
        setConvertedValues(newConvertedValues);
    
        // Update enteredValue for other CustomSelect components
        newCustomSelects.forEach((select, i) => {
            if (i !== index) {
                select.value = newConvertedValues[i];
            }
        });
    
        setCustomSelects(newCustomSelects);
    };
    
      

    const calculateConvertedValue = (index) => {
        // if (!customSelects[index].currency || !customSelects[index].value) {
        //   return null;
        // }

        if (!customSelects[index].currency) {
            return null;
        }

        const fromCurrency = customSelects[index].currency;
        const fromValue = customSelects[index].value;
        const fromRate = rates[`USD${fromCurrency}`]?.Exrate;
        
        console.log(fromCurrency, fromValue, fromRate);
      
        const usdValue = fromValue / fromRate;
        console.log("usdValue: "+ usdValue);

        return customSelects.map((select, i) => {
            if (i === index || !select.currency) {
                return null;
            }
            const toRate = rates[`USD${select.currency}`]?.Exrate;
            console.log("toRate: "+toRate);

            const answer = (usdValue * toRate).toFixed(2);
            console.log("answer: "+ answer);
            return answer;
        });
      
      };
      

      const handleCurrencyChange = (currency, index) => {
        const newCustomSelects = [...customSelects];
        newCustomSelects[index].currency = currency;
        setCustomSelects(newCustomSelects);
    
        // 如果輸入值為 null，則跳過更新轉換值的操作
        if (newCustomSelects[index].value === null) {
            return;
        }
    
        // Calculate the converted values and update the state
        const newConvertedValues = calculateConvertedValue(index);
        setConvertedValues(newConvertedValues);
    
        // Update enteredValue for other CustomSelect components
        newCustomSelects.forEach((select, i) => {
            if (i !== index) {
                select.value = newConvertedValues[i];
            }
        });
    
        setCustomSelects(newCustomSelects);
    };

    return (
        <div className="ConverterBox">
            <div className="titleBox">
                <h2>
                    <FontAwesomeIcon icon={faRotate} /> Converter
                </h2>
                <h2>
                    <Link to="/average">
                        <FontAwesomeIcon icon={faCoins} /> Average
                    </Link>
                </h2>
                
            </div>

            <div className="changeBox">
                {customSelects.map((select, index) => (
                    <CustomSelect
                        key={index}
                        options={currencies}
                        selectedCurrency={select.currency}
                        enteredValue={select.value}
                        convertedValues={convertedValues} 
                        onNumberChange={(number) => handleEnteredNumberChange(number, index)}
                        onCurrencyChange={(currency) => handleCurrencyChange(currency, index)}
                        index={index}
                        
                    />
                ))}
            </div>
        </div>
    );
};

export default Converter;
