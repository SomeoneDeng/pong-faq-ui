import { Button, Col, Divider, Input, Layout, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import LatestQuestion from '../comps/LatestQuestion';
import { Component } from 'react';
import Category from '../comps/Category';
import { useNavigate, useParams } from 'react-router-dom';

class IndexPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
        }
    }

    render () {
        return <Layout>
        <Row>
        <Col span={24} style={{textAlign: 'center'}}>
            <div style={{paddingTop: '32px', paddingBottom: "24px", background: "linear-gradient(to right, teal, #007d65)"}}>
            <Title style={{color: 'white'}}>有问题？</Title>  
            <Text style={{color: 'whitesmoke'}} italic={true}>如果你有问题，你可以在下面的搜索框搜索你想要的！</Text>
            <br/>
            <Row style={{paddingTop: '8px'}}>
                <Col span={12} offset={5}>
                <Input type={"search"} onChange={(e) => {
                    this.setState({search: e.target.value})
                }}></Input> 
                </Col>
                <Col span={2}><Button style={{color: 'teal'}} type='default' onClick={()=> {
                    if (this.state.search != '') {
                        this.props.navigate("/search/" + this.state.search)
                    }
                }}>搜索</Button></Col>
            </Row>
            </div>
        </Col>
        </Row>

        <Row>
            <Col style={{paddingLeft: "36px", paddingRight: '8px'}} md={{ span: 12, offset: 4 }} sm={24} xs={24}>
            <Title style={{color: "#3b4348"}} level={3}>最新</Title>
            <Divider></Divider>
            <LatestQuestion></LatestQuestion>
            </Col>
            <Col md={{ span: 6 }} sm={24} xs={24}>
            <Title style={{color: "#3b4348"}} level={3}>分类</Title>
            <Category></Category>
            </Col>
        </Row>
    </Layout>
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams()
    
    return <IndexPage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;