import React, {useState} from "react";
import './Entry.css';

function formatUrl(name) {
    return `https://dictionary.cambridge.org/dictionary/english/${name}`;
}

const Entry = (props) => {
    const data = props.data
    const clickHandlerExternal = props.clickHandler
    const [selected, updateSelected] = useState(false);

    function clickHandler() {
        clickHandlerExternal(!selected)
        updateSelected(!selected)
    }

    const elements = []
    const keys = sortByNameWithPriority(Object.keys(props.data), ["name", "meaning"])


    for (let key of keys) {
        if (key === "name") {
            let url
            if (props.formatUrl) {
                url = <a id="element_more"
                         key="element_more"
                         href={formatUrl(data.name)}>Look up</a>
            }
            elements.push(<div><span id="element_name"
                                     key="element_name"
                                     onClick={clickHandler}>{data.name}</span> {url}</div>)

        } else if (key === "url") {
            elements.push(<a id="element_url"
                             key="element_url" href={data.url}>Details</a>)
        } else {
            const id = `element_${key}`
            elements.push(<div><span id={id}
                                     key={id}
                                     onClick={clickHandler}>{props.data[key]}</span></div>)
        }
    }
    return <div>{elements}</div>
}

function sortByNameWithPriority(keys, priorityNames) {
    const agg = []
    for (let n of priorityNames) {
        const pos = keys.indexOf(n)
        if (pos !== -1) {
            agg.push(n)
            keys[pos] = undefined
        }
    }
    return agg.concat(keys.filter(el => el !== undefined))
}

export default Entry;