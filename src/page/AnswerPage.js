import { CompressOutlined, TagOutlined } from "@ant-design/icons/lib/icons";
import { Card, Col, Divider, Layout, Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Category from "../comps/Category";

class AnswerPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,
        }
    }
    render() {
        console.log(this.state.id)
        return <Layout>
            <Row>
                <Col md={{ span: 14, offset: 3}} sm={24} xs={24}>
                    <Title level={2}>{'材料调差报表和全国专业版本怎么修改表眉表脚的审核人？'}</Title>
                    <Text>{"08 1月, 2021 "}  <TagOutlined></TagOutlined> {'公路（养护、广东）造价软件'}</Text>
                    <Divider></Divider>
                    <p>question content {this.state.id}</p>
                    <Title level={4}>回答</Title>
                    <p>answer question</p>
                    
                </Col>

                <Col md={{ span: 4 }} sm={24} xs={24}>
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
    return <AnswerPage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;