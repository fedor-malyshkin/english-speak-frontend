import React, {useState} from 'react';
import './Dashboard.css';
import EntriesList from "../../components/EntriesList/EntriesList";
import axios from 'axios';

const Dashboard = (props) => {
    const [currentTopicQ1, updateCurrentTopicQ1] = useState("");
    const [currentTopicQ23, updateCurrentTopicQ23] = useState("");
    const [dataMurphy, updateMurphyData] = useState([]);
    const [dataGrammar, updateGrammarData] = useState([]);
    const [dataPhrasalVerbs, updatePhrasalVerbsData] = useState([]);
    const [dataVerbsWithPrep, updateVerbsWithPrepData] = useState([]);
    const [dataInterviewQuestions, updateInterviewQuestionsData] = useState([]);
    const [dataTopicQ1Questions, updateTopicQ1QuestionsData] = useState([]);
    const [dataTopicQ1Vocabulary, updateTopicQ1VocabularyData] = useState([]);
    const [dataTopicQ23Questions, updateTopicQ23QuestionsData] = useState([]);
    const [dataTopicQ23Vocabulary, updateTopicQ23VocabularyData] = useState([]);
    const [dataExpressions, updateExpressionsData] = useState([]);
    const [dataRandomWords, updateRandomWordsData] = useState([]);

    function reloadMurphy() {
        axios.get("/murphy")
            .then(response => updateMurphyData(response.data));
    }

    function reloadGrammar() {
        axios.get("/grammar")
            .then(response => updateGrammarData(response.data));
    }

    function reloadPhrasalVerbs() {
        axios.get("/phrasal_verbs")
            .then(response => updatePhrasalVerbsData(response.data));
    }

    function reloadVerbsWithPrep() {
        axios.get("/verbs_with_prepositions")
            .then(response => updateVerbsWithPrepData(response.data));
    }

    function reloadExpressions() {
        axios.get("/expressions")
            .then(response => updateExpressionsData(response.data));
    }

    function reloadInterview() {
        axios.get("/interview/random")
            .then(response => {
                const value = response.data
                updateInterviewQuestionsData(value)
            })
    }

    function reloadTopicQ1() {
        let topic = ""
        axios.get("/topics_q1/random")
            .then(response => {
                const value = response.data[0].name
                updateCurrentTopicQ1(value)
                topic = value
                return axios.get(`/topics_q1/${value}`)
            })
            .then(response => updateTopicQ1QuestionsData(response.data))
            .then(_ => reloadTopicQ1Vocabulary(topic))
    }

    function reloadTopicQ1Vocabulary(topic) {
        axios.get(`/topics_q1/${topic}/vocabulary`)
            .then(response => updateTopicQ1VocabularyData(response.data));
    }

    function reloadTopicQ23() {
        let topic = ""
        axios.get("/topics_q23/random")
            .then(response => {
                const value = response.data[0].name
                updateCurrentTopicQ23(value)
                topic = value
                return axios.get(`/topics_q23/${value}`)
            })
            .then(response => updateTopicQ23QuestionsData(response.data))
            .then(_ => reloadTopicQ23Vocabulary(topic))
    }

    function reloadTopicQ23Vocabulary(topic) {
        axios.get(`/topics_q23/${topic}/vocabulary`)
            .then(response => updateTopicQ23VocabularyData(response.data));
    }

    function reloadRandomWords() {
        axios.get("/random_words")
            .then(response => updateRandomWordsData(response.data));
    }

    function requestNewData() {
        reloadMurphy();
        reloadGrammar();
        reloadPhrasalVerbs();
        reloadVerbsWithPrep();
        reloadExpressions();
        reloadTopicQ1();
        reloadTopicQ23();
        reloadRandomWords();
        reloadInterview();
    }

    const refreshButton = <button onClick={() => requestNewData()}>Refresh</button>
    const murphy = <EntriesList data={dataMurphy}/>
    const grammar = <EntriesList data={dataGrammar}/>
    const phrasalVerbs = <EntriesList data={dataPhrasalVerbs} formatUrl="true"/>
    const verbsWithPrep = <EntriesList data={dataVerbsWithPrep}/>
    const topicQ1Questions = <EntriesList data={dataTopicQ1Questions}/>
    const topicQ1Vocabulary = <EntriesList data={dataTopicQ1Vocabulary}/>
    const topicQ23Questions = <EntriesList data={dataTopicQ23Questions}/>
    const topicQ23Vocabulary = <EntriesList data={dataTopicQ23Vocabulary}/>
    const expressions = <EntriesList data={dataExpressions} highlightAlgo="0"/>
    const randomWords = <EntriesList data={dataRandomWords} formatUrl="true"/>
    const interviewQuestions = <EntriesList data={dataInterviewQuestions}/>

    return (
        <div className="Dashboard">
            <div id="col1">
                <div id="refresh">
                    {refreshButton}
                </div>
                <div id="grammar">
                    <p onClick={() => reloadGrammar()}>General grammar</p>
                    {grammar}</div>
                <div id="murphy">
                    <p onClick={() => reloadMurphy()}>Murphy's grammar</p>
                    {murphy}</div>
                <div id="phrasal_verbs">
                    <p onClick={() => reloadPhrasalVerbs()}>Phrasal verbs</p>
                    {phrasalVerbs}</div>
                <div id="expressions">
                    <p onClick={() => reloadExpressions()}>Expressions (idioms, linking words, etc)</p>
                    {expressions}</div>
                <div id="interview">
                    <p onClick={() => reloadInterview()}>Interview</p>
                    {interviewQuestions}</div>
            </div>
            <div id="col2">
                <div id="topic_q1">
                    <p onClick={() => reloadTopicQ1()}>IELTS topic 1 suggestion</p>
                    {currentTopicQ1}</div>
                <div id="topic_q1_questions">
                    <p>IELTS topic 1 questions</p>
                    {topicQ1Questions}</div>
                <div id="topic_q1_vocabulary">
                    <p onClick={() => reloadTopicQ1Vocabulary(currentTopicQ1)}>IELTS topic 1 vocabulary</p>
                    {topicQ1Vocabulary}</div>
                <div id="topic_q23">
                    <p onClick={() => reloadTopicQ23()}>IELTS topic 2, 3 suggestion</p>
                    {currentTopicQ23}</div>
                <div id="topic_q23_questions">
                    <p>IELTS topic 2, 3 questions</p>
                    {topicQ23Questions}</div>
                <div id="topic_q23_vocabulary">
                    <p onClick={() => reloadTopicQ23Vocabulary(currentTopicQ23)}>IELTS topic 2, 3 vocabulary</p>
                    {topicQ23Vocabulary}</div>
                <div id="random_words">
                    <p onClick={() => reloadRandomWords()}>Random words/phrases</p>
                    {randomWords}</div>
                <div id="verbs_with_preps">
                    <p onClick={() => reloadVerbsWithPrep()}>Verbs with prepositions</p>
                    {verbsWithPrep}</div>
            </div>
        </div>
    );
}
export default Dashboard;
