import React from "react";
import './Entry.css';


function formatUrl(name) {
    return `https://dictionary.cambridge.org/dictionary/english/${name}`;
}

const Entry = (props) => {
    const data = props.data
    const elements = []

    if (data.name) {
        let url;
        if (props.format_url) {
            url = <a href={formatUrl(data.name)}>More info</a>
        }
        elements.push(<div id="element_name" key="element_name">{data.name} {url}</div>)
    }
    if (data.meaning) elements.push(<div id="element_meaning" key="element_meaning">{data.meaning}</div>)
    if (data.note) elements.push(<div id="element_note" key="element_note">{data.note}</div>)
    if (data.url) elements.push(<a id="element_url" key="element_url" href={data.url}>More info</a>)

    return <div>{elements}</div>
}

export default Entry;