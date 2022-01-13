import { Button, Card, Col, Form, Input, Layout, Row } from "antd";
import axios from "axios";
import { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import urls from "../urls";

class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth
        }
    }

    componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    }
      
    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
    }
      
    handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
    };

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
                <Col md={{span: 8, offset: 8}} sm={{span: 24}} xs={{span: 24}}>
                    <Card style={{marginTop: this.state.width > 700 ? '10%': ''}}>
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