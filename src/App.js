import logo from './logo.svg';
import './App.css';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { Button, Col, Divider, Input, Layout, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import LatestQuestion from './comps/LatestQuestion';
import Category from './comps/Category';
import Routers from './routers';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Header aria-haspopup={true} style={{backgroundColor: 'teal'}}>
          <Row>
          <Col md={{span: 4}} sm={{span: 6, offset: 0}}>
            <Link to={"/"}><Text style={{fontSize: "32px", color: 'white'}}>帮助中心</Text></Link>
          </Col>
          
          {/* <Col md={{span: 4, offset: 16}} sm={{span: 6, offset: 0}}>
            <Button style={{color: 'whitesmoke'}} type='link'>首页 |</Button>
            <Button style={{color: 'whitesmoke'}} type='link'>官网 |</Button>
          </Col> */}
          </Row>
      </Header>
      <Content>
        <Routers></Routers>
      </Content>
     
    </Layout>
  );
}

export default App;
