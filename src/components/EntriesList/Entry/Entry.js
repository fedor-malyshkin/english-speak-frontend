import React, {useState} from "react";
import './Entry.css';

function formatUrl(name) {
    return `https://dictionary.cambridge.org/dictionary/english/${name}`;
}

const Entry = (props) => {
    const data = props.data
    const clickHandlerExternal = props.clickHandler
    const elements = []
    const [selected, updateSelected] = useState(false);

    function clickHandler() {
        clickHandlerExternal(!selected)
        updateSelected(!selected)
    }

    if (data.name) {
        let url
        if (props.formatUrl) {
            url = <a id="element_more"
                     key="element_more"
                     href={formatUrl(data.name)}>More info</a>
        }
        elements.push(<div><span id="element_name"
                                 key="element_name"
                                 onClick={clickHandler}>{data.name}</span> {url}</div>)
    }
    if (data.meaning) elements.push(<div id="element_meaning"
                                         key="element_meaning"
                                         onClick={clickHandler}>{data.meaning}</div>)
    if (data.note) elements.push(<div id="element_note"
                                      key="element_note"
                                      onClick={clickHandler}>{data.note}</div>)
    if (data.url) elements.push(<a id="element_url"
                                   key="element_url" href={data.url}>More info</a>)
    return <div>{elements}</div>
}

export default Entry;