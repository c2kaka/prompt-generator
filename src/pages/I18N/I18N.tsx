import {Form, Input, Button, Select} from 'antd';
import './I18N.css'
import {useState} from "react";

const { TextArea } = Input;

function I18N() {
  const basicPrompt = `你是一个翻译家，需要将中文转换为i18n的yaml配置文件，yaml文件示例为:
    SERVICE: 
    BASIC_INFO: 基本信息
    PREVIEW: 数据预览
    
 请把以下的中文文本分别翻译生成对应的en-us.yaml和zh-cn.yaml文件。`;

  const [form] = Form.useForm();

  const generatePrompt = () => {
    const role = form.getFieldValue('basicPrompt');
    const text = form.getFieldValue('text');
    const result = [role, text].join('\n');
    setResult(result);
  };

  const [result, setResult] = useState('');

  return (
    <div className={"i18n"}>
      <Form
        className={"form"}
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ basicPrompt: basicPrompt }}
        autoComplete="off"
      >
        <Form.Item
          label="Basic Prompt"
          name="basicPrompt"
        >
          <TextArea
            style={{ height: 200 }}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="Text"
          name="text"
        >
          <TextArea
            showCount
            style={{ height: 300 }}
            className={"code-textarea"}
          />
        </Form.Item>
      </Form>

      <Button className={"submit-btn"} onClick={generatePrompt}>Submit</Button>

      <TextArea
        showCount
        className={"result-textarea"}
        value={result}
        onChange={e => setResult(e.target.value)}
      />
    </div>
  );
}

export default I18N;
