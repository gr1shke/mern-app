import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import M from 'materialize-css';
import s from './style.module.scss';

const Autocomplete = ({name, label, onAutocompleteHandler, uppercase = false, options = {}, customClass = ''}) => {
    const inputEl = useRef(null);
    const [inputId, setInputId] = useState(null);
    const [inputInstance, setInputInstanse] = useState(null);

    const autocompleteCallback = () => {
        if (!_.isUndefined(inputEl.current)) {
            onAutocompleteHandler(inputEl.current.value);
        }
    }

    const onKeyUpHandler = () => {
        if (!_.isUndefined(inputEl.current) && !inputEl.current.value) {
            onAutocompleteHandler(inputEl.current.value);
        }
    }

    useEffect(() => {
        setInputId(_.uniqueId('autocomplete-input-'));
        options.onAutocomplete = autocompleteCallback;
        setInputInstanse(M.Autocomplete.init(inputEl.current, options))
    }, [options])

    return (
        <div className={`input-field ${customClass}`}>
            <input 
                ref={inputEl}
                type="text"
                name={name}
                id={inputId}
                className={`${(uppercase ? s.uppercase : '')} autocomplete`}
                onKeyUp={onKeyUpHandler}
            />
            <label htmlFor={inputId}>{label}</label>
        </div>
    )
};

export default Autocomplete;