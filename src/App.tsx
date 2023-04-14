import {Tabs, TabsProps} from 'antd';
import './App.css'
import UnitTest from "./pages/UnitTest/UnitTest";
import I18N from "./pages/I18N/I18N";


const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Unit Test`,
    children: <UnitTest />,
  },
  {
    key: '2',
    label: `i18n`,
    children: <I18N />,
  },
];


function App() {
  return (
    <Tabs defaultActiveKey="1" items={items}/>
  )
}

export default App
