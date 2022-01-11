import { CompressOutlined, TagOutlined } from "@ant-design/icons/lib/icons";
import { Button, Card, Col, Divider, Input, Layout, List, Pagination, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import { Component } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Category from "../comps/Category";
import urls from "../urls";

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: this.props.params.key,
            search: '',

            page: 1,
            size: 10,
            total: 10,

            items: []
        }
    }

    componentDidMount() {
        this.loadData()
    }

    componentWillReceiveProps(nextProps) {
        const {MAIN, QUESTION_PAGE} = urls;
        const {page, size} = this.state
        axios.get(MAIN + QUESTION_PAGE + "?page=" + page + "&size=" + size + "&search=" + nextProps.params.key).then(resp => this.setState({items: resp.data.records, total: resp.data.total})) 
    }


    loadData = () => {
        const {MAIN, QUESTION_PAGE} = urls;
        const {key, page, size} = this.state
        axios.get(MAIN + QUESTION_PAGE + "?page=" + page + "&size=" + size + "&search=" + key).then(resp => this.setState({items: resp.data.records, total: resp.data.total}))
    }

    render() {
        const {items} = this.state;
        console.log(this.state)
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
                <Col md={{ span: 13, offset: 3}} sm={24} xs={24}>
                    <Title style={{color: "#3b4348"}} level={3}>问题</Title>

                    <Layout>
                        <Row>
                            <Col>
                            
                            <List dataSource={items} renderItem={item => {
                                    return <List.Item key={item.id}>
                                        <Layout>
                                            <Row><Col>
                                                <Link to={"/answer/" + item.id}><Title style={{color: "#3b4348"}} level={5}>{item.title}</Title></Link>
                                            </Col></Row>
                                            <Row>
                                                <Col span={12}><i>{item.created}</i></Col>
                                                <Col span={12}><Link to={"/category/" + item.cid}>{item.category}</Link></Col>
                                            </Row>
                                        </Layout>
                                    </List.Item>
                                }}></List>
                            </Col>
                            <Col span={24}>
                                <Pagination onChange={(p, s) => {
                                    console.log(p, ' ',s)
                                    this.setState({page: p, size: s}, this.loadData)
                                    // this.loadData()
                                }} showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} pageSize={this.state.size} defaultCurrent={1} total={this.state.total} />
                            </Col>
                        </Row>
                    </Layout>

                </Col>

                <Col md={{ span: 4, offset:1 }} sm={24} xs={24}>
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
    
    return <SearchPage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;