import { Card, Col, Layout, List, Row } from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import { Link } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import urls from "../urls";

export default class LatestQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        const {MAIN, QUESTION_PAGE} = urls;
        axios.get(MAIN + QUESTION_PAGE).then(resp => this.setState({items: resp.data.records}))
    }

    render() {
        const {items} = this.state
        console.log(items)
        return <List dataSource={items} renderItem={item => {
            return <List.Item key={item.id}>
                <Layout>
                    <Row><Col>
                        <Link to={"/answer/" + item.id}><Title style={{color: "#3b4348"}} level={5}>{item.title}</Title></Link>
                    </Col></Row>
                    <Row>
                        <Col span={6}><i>{item.created}</i></Col>
                        <Col span={12}>in <Link style={{color: 'teal'}} to={"/category/" + item.cid}>{item.category}</Link></Col>
                    </Row>
                </Layout>
            </List.Item>
        }}></List>
    }
}