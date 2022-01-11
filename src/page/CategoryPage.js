import { CompressOutlined, TagOutlined } from "@ant-design/icons/lib/icons";
import { Card, Col, Divider, Layout, List, Pagination, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import { Component } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Category from "../comps/Category";
import urls from "../urls";

class CategoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,

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
        const {id, page, size} = this.state
        axios.get(MAIN + QUESTION_PAGE + "?page=" + page + "&size=" + size + "&cid=" + nextProps.params.id).then(resp => this.setState({items: resp.data.records, total: resp.data.total})) 
    }


    loadData = () => {
        const {MAIN, QUESTION_PAGE} = urls;
        const {id, page, size} = this.state
        axios.get(MAIN + QUESTION_PAGE + "?page=" + page + "&size=" + size + "&cid=" + id).then(resp => this.setState({items: resp.data.records, total: resp.data.total}))
    }

    render() {
        const {items} = this.state;
        console.log(this.state)
        return <Layout>
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
                                                <Col span={12}><Link  style={{color: 'teal'}} to={"/category/" + item.cid}>{item.category}</Link></Col>
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
    return <CategoryPage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;