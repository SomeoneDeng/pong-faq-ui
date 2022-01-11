import { ArrowRightOutlined } from "@ant-design/icons/lib/icons";
import { Card, Col, Layout, List, Row } from "antd";
import Text from "antd/lib/typography/Text";
import axios from "axios";
import { Link } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import urls from "../urls";

export default class Category extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        const {MAIN, CATEGORY_ALL} = urls;
        axios.get(MAIN + CATEGORY_ALL).then(resp => this.setState({items: resp.data}))
    }

    render() {
        const {items} = this.state
        
        return <List split={true} dataSource={items} renderItem={item => {
            return <List.Item key={item.id}>
                <Text><ArrowRightOutlined></ArrowRightOutlined> 
                <Link style={{color: 'teal'}} to={"/category/" + item.id}>
                    {item.name}
                </Link> ({item.questionNum})</Text>
            </List.Item>
        }}></List>
    }
}