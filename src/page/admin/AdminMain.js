import { InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons/lib/icons";
import { Layout, Menu, Nav } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import { Component } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

class AdminMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 'question'
        }
    }

    render() {
        return <div>
            <Layout>
               
                <Menu onClick={(a)=>{
                    this.setState({current: a.key}, ()=> {
                        this.props.navigate("/admin/" + a.key)
                    })
                }} selectedKeys={this.state.current} mode="horizontal">
                    <Menu.Item key="question" icon={<QuestionCircleOutlined></QuestionCircleOutlined>}>
                        问题
                    </Menu.Item>
                    <Menu.Item key="category" icon={  <InfoCircleOutlined></InfoCircleOutlined>  }>
                        分类
                    </Menu.Item> 
                </Menu>
               
                <Layout>
                    <Content>
                        <Outlet>
                        </Outlet>
                    </Content>
                </Layout>
            </Layout>
        </div>
    }
}


function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams()
    
    return <AdminMain {...props} params={params} navigate={navigate} />
}

export default WithNavigate;