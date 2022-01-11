import { Button, Card, Col, Form, Input, Layout, Row } from "antd";
import axios from "axios";
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import urls from "../urls";

class LoginPage extends Component {
    onFinish = (values) => {
    console.log('Success:', values);
        const {MAIN, ADMIN_LOGIN} = urls;
        axios.post(MAIN + ADMIN_LOGIN, values).then(resp => {
            window.localStorage.setItem("token", resp.data)
            this.props.navigate("/admin/")
        })
    };

    onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    render() {
        return <Layout style={{minHeight: '100vh'}}>
            <Row>
                <Col span={8} offset={8}>
                    <Card style={{marginTop: '50%'}}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.componentDidCatchonFinishFailed}
                        autoComplete="off"
                        >
                        <Form.Item
                            label="账号"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                            登录
                            </Button>
                        </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout>
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams()
    
    return <LoginPage {...props} params={params} navigate={navigate} />
}

export default WithNavigate;