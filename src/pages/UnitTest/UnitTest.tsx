import {Form, Input, Button, Select} from 'antd';
import './UnitTest.css'
import {useState} from "react";

const { TextArea } = Input;


function UnitTest() {
  const rolePrompt = 'You are a frontend developer.';

  const providersPrompt = `Provide jasmine spy for all injected services.
In the unit test, remember to add the following configurations:
Use NO_ERRORS_SCHEMA from '@angular/core' in schemas.
Import FormsModule from '@angular/forms'.
Import MockModule from 'tdc-ui/mock'.
Import MockModule from 'app/mock'.
Import of and throwError from 'rxjs'.`;

  const getWriteTestPrompt = (methods: string | undefined) => {
    if (methods == undefined) {
      return `Write unit test for the following component.`;
    }

    return `Write unit test to cover ${methods}  of the following component.`;
  };
  // [
  //   `Write unit test for the following component.`
  // ];

  const coveragePromptOptions = [`Try to cover as much code and branches as possible.`];

  const [form] = Form.useForm();

  const generatePrompt = () => {
    const role = form.getFieldValue('rolePrompt');
    const providers = form.getFieldValue('providersPrompt');
    const code = `Here is the code:
${form.getFieldValue('code')}`;
    const writeTestPrompt = getWriteTestPrompt(form.getFieldValue('methodsPrompt'));
    const coveragePrompt = form.getFieldValue('coveragePrompt');
    const result = [role, providers, writeTestPrompt, coveragePrompt, code].filter(_item => _item != undefined).join('\n\n');
    setResult(result);
  };

  const [result, setResult] = useState('');

  return (
    <div className={"unit-test"}>
      <Form
        className={"form"}
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ rolePrompt: rolePrompt, providersPrompt: providersPrompt }}
        autoComplete="off"
      >
        <Form.Item
          label="Role Prompt"
          name="rolePrompt"
        >
          <Input disabled/>
        </Form.Item>


        <Form.Item
          label="Providers Prompt"
          name="providersPrompt"
        >
          <TextArea
            style={{ height: 200 }}
            showCount
          />
        </Form.Item>

        <Form.Item
          label="Methods Prompt"
          name="methodsPrompt"
        >
          <TextArea
            style={{ height: 80 }}
            showCount
            allowClear={true}
          />
        </Form.Item>

        <Form.Item
          label="Coverage Prompt"
          name="coveragePrompt"
        >
          <Select
            allowClear={true}
            options={coveragePromptOptions.map(_item => ({label: _item, value: _item}))}
          />
        </Form.Item>

        <Form.Item
          label="Code"
          name="code"
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
  )
}

export default UnitTest
