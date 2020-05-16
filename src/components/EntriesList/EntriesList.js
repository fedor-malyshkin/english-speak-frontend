import React from "react";
import Entry from './Entry/Entry';
import './EntriesList.css';

const EntriesList = (props) => {

    let elements = []

    if (props.data) {
        elements = props.data.map(entry => {
            return (
                <li key={entry.name}>
                    <input type="checkbox"/>
                    <Entry data={entry} format_url={props.format_url}/>
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