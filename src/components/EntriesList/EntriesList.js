import React, {useState} from "react";
import Entry from './Entry/Entry';
import './EntriesList.css';

const EntriesList = (props) => {
    let elements = []
    const [states, updateStates] = useState({})

    function updateCheckbox(state, index) {
        let newState = {}
        newState[index] = state
        updateStates({...states, ...newState})
    }

    if (props.data) {
        elements = props.data.map((entry, index) => {
            let checkboxEnabled = false
            if (states[index])
                checkboxEnabled = true

            return (
                <li key={index}>
                    <input type="checkbox" checked={checkboxEnabled} disabled={true}/>
                    <Entry data={entry} formatUrl={props.formatUrl}
                           clickHandler={(state) => updateCheckbox(state, index)}/>
                </li>)
        });
    }

    return (
        <ul>
            {elements}
        </ul>
    );
}


export default EntriesList;