import {Button, Input} from "antd";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import './JiraList.css'

const { TextArea } = Input;

const generateJiraList = (input: string) => {
    const regex = /WARP-\d+/g;

    // 从输入中提取JIRA号
    const jiraNumbers = input.match(regex) || [];

    // 对JIRA号进行排序
    jiraNumbers.sort();

    // 拼接为超链接形式
    return Array.from(new Set(jiraNumbers)).map(jiraNumber => `- [${jiraNumber}](https://jira.transwarp.io/browse/${jiraNumber})`).join('\n');
}

function JiraList() {
    const [input, setInput] = useState('');

    const [result, setResult] = useState('Just a link: https://reactjs.com.');


    const generate = () => {
        setResult(generateJiraList(input));
    };

    return (
        <div className="container mx-auto">
            <TextArea showCount rows={10} value={input} onChange={e => setInput(e.target.value)}></TextArea>


            <Button className="my-4" onClick={generate}>Submit</Button>


            <ReactMarkdown className="markdown" children={result} remarkPlugins={[remarkGfm]}></ReactMarkdown>
        </div>
    );
}

export default JiraList;