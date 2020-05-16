import React, {useState} from 'react';
import './Dashboard.css';
import EntriesList from "../../components/EntriesList/EntriesList";
import axios from 'axios';

const Dashboard = (props) => {
    const [currentTopic, updateCurrentTopic] = useState("");
    const [dataMurphy, updateMurphyData] = useState([]);
    const [dataGrammar, updateGrammarData] = useState([]);
    const [dataPhrasalVerbs, updatePhrasalVerbsData] = useState([]);
    const [dataVocabulary, updateVocabularyData] = useState([]);
    const [dataGeneralVocabulary, updateGeneralVocabularyData] = useState([]);

    function requestNewData() {
        axios.get("/murphy")
            .then(response => updateMurphyData(response.data));
        axios.get("/grammar")
            .then(response => updateGrammarData(response.data));
        axios.get("/phrasal_verbs")
            .then(response => updatePhrasalVerbsData(response.data));
        axios.get("/general_vocabulary")
            .then(response => updateGeneralVocabularyData(response.data));
        axios.get("/topic")
            .then(response => {
                const value = response.data[0].name
                updateCurrentTopic(value)
                return axios.get(`/vocabulary/${value}`)
            })
            .then(response => updateVocabularyData(response.data));
    }

    const refreshButton = <button onClick={() => requestNewData()}>Refresh</button>
    const murphy = <EntriesList data={dataMurphy}/>
    const grammar = <EntriesList data={dataGrammar}/>
    const phrasalVerbs = <EntriesList data={dataPhrasalVerbs} format_url="true"/>
    const vocabulary = <EntriesList data={dataVocabulary} format_url="true"/>
    const generalVocabulary = <EntriesList data={dataGeneralVocabulary} format_url="true"/>

    return (
        <div className="Dashboard">
            <div id="col1">
                <div id="refresh">{refreshButton}</div>
                <div id="grammar">{grammar}</div>
                <div id="phrasal_verbs">{phrasalVerbs}</div>
            </div>
            <div id="col2">
                <div id="murphy">{murphy}</div>
                <div id="topic">Topic: {currentTopic}</div>
                <div id="vocabulary">{vocabulary}</div>
                <div id="general_vocabulary">{generalVocabulary}</div>
            </div>
        </div>
    );
}
export default Dashboard;
