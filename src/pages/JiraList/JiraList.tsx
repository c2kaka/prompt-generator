import {Button, Input} from "antd";
import { useState } from "react";
const { TextArea } = Input;

const generateJiraList = (input: string) => {
    const regex = /WARP-\d+/g;

    // 从输入中提取JIRA号
    const jiraNumbers = input.match(regex) || [];

    // 对JIRA号进行排序
    jiraNumbers.sort();

    // 拼接为超链接形式
    return Array.from(new Set(jiraNumbers)).map(jiraNumber => `- [${jiraNumber}](https://jira.transwarp.io/browse/${jiraNumber})`);
}

function JiraList() {
    const [input, setInput] = useState('');

    const [result, setResult] = useState(['']);


    const generate = () => {
        setResult([...generateJiraList(input)]);
    };

    return (
        <>
            <div className={"body"}>
                <TextArea showCount rows={10} value={input} onChange={e => setInput(e.target.value)}></TextArea>
            </div>

            <Button className={"submit-btn"} onClick={generate}>Submit</Button>

            <ul>
                {result.map(jiraLink => <li key={jiraLink}>{jiraLink}</li>)}
            </ul>
        </>
    );
}

export default JiraList;