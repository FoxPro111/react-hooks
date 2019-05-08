import { useState } from 'react';

export const useFormInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputIsValid, setInputIsValid] = useState('');

    const inputChangeHandler = event => {
        setInputValue(event.target.value);
        setInputIsValid(event.target.value.trim() !== '');
    }

    return {
        value: inputValue,
        onChange: inputChangeHandler,
        validity: inputIsValid
    };
};